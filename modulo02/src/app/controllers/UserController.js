import User from '../models/User';

class UserController {
  // Funciona como Middlewares
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      //Verificando se o usuario existe
      return res.status(400).json({ error: 'User already exists.' });
    }
    //Mostrar apenas dados de interesse ao usuário
    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });
      if (userExists) {
        //Verificando se o usuario existe
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      //Criando a condição de alteração de senha só se  o usario quiser trocar a senha
      return res.status(401).json({ error: 'Password does not match' });
    }
    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}
export default new UserController();
