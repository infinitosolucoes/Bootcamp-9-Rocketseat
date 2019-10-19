import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

//Criando as colunas que serão preenchidas pelo usário
class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      // Criando a criptografia da senha
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}
export default User;
