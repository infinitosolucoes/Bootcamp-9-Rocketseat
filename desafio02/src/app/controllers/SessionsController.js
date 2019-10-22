import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth'; // Arquivo de autenticação

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const userExist = await User.findOne({ where: { email } });
    if (!userExist) {
      return res.status(401).json({ error: 'User not found' });
    }
    // Verificar se a senha é a correta
    if (!(await userExist.checkPassword(password))) {
      return res.status(401).json({ error: 'User not found' });
    }
    const { id, name } = userExist;
    return res.json({
      user: { id, name, email },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn, // data expiração
      }), // Colocar id dentro do token + texto unico
    });
  }
}
export default new SessionController();
