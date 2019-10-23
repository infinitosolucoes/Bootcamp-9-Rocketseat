import * as Yup from 'yup';
import Students from '../models/Students';

class StudentsController {
  // Create
  async store(req, res) {
    // Verificar se o o usuário ja existe
    const studentsExists = await Students.findOne({
      where: { email: req.body.email },
    });
    if (studentsExists) {
      return res.status(400).json({ error: 'Student already exists' });
    }
    const {
      id,
      name,
      email,
      age,
      height,
      wheight /* Passando só o que vou retornar para o front-end */,
    } = await Students.create(req.body);
    return res.json({
      id,
      name,
      email,
      age,
      height,
      wheight,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number()
        .positive()
        .integer(),
      weight: Yup.number().positive(),
      height: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email } = req.body;

    const student = await Students.findOne({ where: { email } });

    if (!student) {
      return res.status(400).json({ error: 'User does not exists.' });
    }

    const { name, age, weight, height } = await student.update(req.body);

    return res.json({
      name,
      email,
      age,
      weight,
      height,
    });
  }
}

export default new StudentsController();
