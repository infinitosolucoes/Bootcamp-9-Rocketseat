import Sequelize from 'sequelize';

import databaseConfig from '../config/database';
import User from '../app/models/User';
import Students from '../app/models/Students';

const models = [User, Students];

class Database {
  constructor() {
    this.init();
  }

  // conexão com a base de dados
  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }
}
export default new Database();
