import User from '../models/User';
import File from '../models/Files';

class ProviderController {
  // Criando a listagem de providerss
  async index(req, res) {
    const providers = await User.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'email', 'avatar_id'], // Retornar apenas os dados que me interessa
      include: [
        { model: File, as: 'avatar', attributes: ['name', 'path', 'url'] },
      ], // as é o apelido. attributes retornar só que deseja
    });
    return res.json(providers);
  }
}
export default new ProviderController();
