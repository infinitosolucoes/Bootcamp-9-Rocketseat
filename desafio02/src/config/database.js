module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gympoint',
  port: 5430,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
