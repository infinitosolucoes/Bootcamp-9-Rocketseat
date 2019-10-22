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
}
export default new StudentsController();
