const Sequelize = require('sequelize');

const sequelizeInstance = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    pool: {
      max: parseInt(process.env.DB_POOL_MAX, 10),
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    schema: 'public'
  }
);

module.exports = sequelizeInstance;
