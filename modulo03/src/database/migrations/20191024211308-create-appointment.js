module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('appointments', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        // Marcar qual user ta fazendo agendamento
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        oneDelete: 'SET NULL',
        allowNull: true,
      },
      provider_id: {
        // Qual prestador de serviço vai atender o agendamento
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        oneDelete: 'SET NULL',
        allowNull: true,
      },
      canceled_at: {
        // Marcar a data que foi cancelado o agendamento
        type: Sequelize.DATE,
        allowNull: true,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('appointments');
  },
};
