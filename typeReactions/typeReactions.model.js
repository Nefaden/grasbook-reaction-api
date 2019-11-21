const Sequelize = require('sequelize');
const sequelizeInstance = require('../database/connectDatabase');

const { Model } = Sequelize;

class TypeReaction extends Model {}

TypeReaction.init(
  {
    uuid: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    iconUrl: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    sequelize: sequelizeInstance,
    modelName: 'typeReaction',
    freezeTableName: true
  }
);

module.exports = TypeReaction;
