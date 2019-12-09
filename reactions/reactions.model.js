const Sequelize = require('sequelize');
const sequelizeInstance = require('../database/connectDatabase');
const TypeReaction = require('../typeReactions/typeReactions.model');

const { Model } = Sequelize;

class Reaction extends Model {}
Reaction.init(
  {
    uuid: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: true,
      autoIncrement: true
    },

    typeReactionUuid: {
      type: Sequelize.UUID,
      primaryKey: false,
      allowNull: false
    },

    userUuid: {
      type: Sequelize.UUID,
      primaryKey: false,
      allowNull: false
    },
    objectUuid: {
      type: Sequelize.UUID,
      primaryKey: false,
      allowNull: false
    },
    objectType: {
      type: Sequelize.STRING,
      primaryKey: false,
      allowNull: false
    }
  },
  {
    sequelize: sequelizeInstance,
    modelName: 'reaction',
    freezeTableName: true
  }
);

TypeReaction.hasMany(Reaction, {
  foreignKey: 'typeReactionUuid'
});

module.exports = Reaction;
