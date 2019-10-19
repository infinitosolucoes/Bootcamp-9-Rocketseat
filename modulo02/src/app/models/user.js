import Sequelize, { Moedel } from 'sequelize';
//Criando as colunas que serão preenchidas pelo usário
class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }
}
export default User;
