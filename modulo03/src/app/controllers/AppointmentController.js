import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';
import User from '../models/User';
import File from '../models/Files';
import Appointment from '../models/Appointment';
import Notification from '../schemas/Notification';

class AppointmentController {
  async index(req, res) {
    const { page } = req.query;

    /* Criando a listagem de agendamentos */
    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      attributes: ['id', 'date'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });
    return res.json(appointments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { provider_id, date } = req.body;
    // Usuario nao pode agendar para si mesmo
    if (provider_id === req.userId) {
      return res
        .status(401)
        .json({ error: "You can't create an appointment for yourself" });
    }

    /*
    Verificar se o provider_id é um provider
    */
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });
    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create appoitments with providers' });
    }
    const hourStart = startOfHour(parseISO(date)); // Garantido que data de agendamento seja em datas futuras
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past date are not permited' });
    }
    const checkAvailability = await Appointment.findOne({
      // Checando data disponivel no sistema
      where: { provider_id, canceled_at: null, date: hourStart },
    });
    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not available' });
    }

    /* Criando agendamento */
    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date,
    });

    /* Notificar o prestador de serviços */
    const user = await User.findByPk(req.userId);
    const formattedDate = format(hourStart, "dd 'de' MMMM', às' H:mm' hrs'", {
      locale: pt,
    });
    await Notification.create({
      content: `Novo agendamento de ${user.name} para o dia ${formattedDate}`,
      user: provider_id,
    });

    return res.json(appointment);
  }

  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.id);
    if (appointment.user_id !== req.userId) {
      return res.status(401).json({
        error: "You don't have permission to cancel this appoitment.",
      });
    }
    // Cancelamento só com 2 horas de atendencencia ao serviço
    const dateWithSub = subHours(appointment.date, 2);
    if (isBefore(dateWithSub, new Date())) {
      return res
        .status(401)
        .json({ error: 'You can cancel appoitments 2 hour in advance.' });
    }
    appointment.canceled_at = new Date();
    await appointment.save();
    return res.json(appointment);
  }
}
export default new AppointmentController();
