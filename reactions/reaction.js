/* eslint-disable no-console */
const lodash = require('lodash');
const Sequelize = require('sequelize');
const Reaction = require('./reactions.model');
const TypeReaction = require('../typeReactions/typeReactions.model');
const { ErrorFunctions } = require('../functions');

const findAll = options => {
  const where = {
    ...options.query
  };
  const args = {
    ...options
  };
  delete where.limit;
  delete where.page;
  delete where.sort;
  delete where.sortColumn;

  args.query.offset = args.query.limit * args.query.page;
  args.query.where = where;

  return Reaction.findAll(args.query)
    .then(result => {
      ErrorFunctions.error416(result, args.query);
      ErrorFunctions.error404(result);
      return {
        result,
        code: 206
      };
    })
    .catch(err => {
      throw ErrorFunctions.error400(err);
    });
};

const findByUUID = options => {
  return Reaction.findByPk(options).then(result => {
    ErrorFunctions.error404(result);
    return result;
  });
};

const findByObjectUUID = (uuid, options) => {
  const args = { ...options };
  args.where = {
    '$reactions.objectUuid$': uuid, // Usage du Eager loading .... permet de ne pas avoir les type de reaction "vide"
    '$reactions.objectType$': options.objectType // la données que l'on souhaite avoir n'est pas nécéssairement la ou je l'ai mis
  };
  args.include = [
    {
      model: Reaction,
      attributes: []
    }
  ];
  args.attributes = {};
  args.attributes.include = [
    [Sequelize.fn('COUNT', Sequelize.col('reactions.uuid')), 'HitCount'] // ICI on effectue le COUNT (il faudra vérifier que le count prend en compte le where)
  ];
  args.group = ['typeReaction.uuid'];

  // Utile si on trie l'ordre des TypeReactions
  if (lodash.isNull(args.sortColumn) || lodash.isUndefined(args.sortColumn)) {
    args.sortColumn = 'name';
  }
  if (lodash.isNull(args.sort) || lodash.isUndefined(args.sort)) {
    args.sort = 'ASC';
  }
  console.log(args);
  return TypeReaction.findAll(args)
    .then(result => {
      ErrorFunctions.error404(result);
      return { result, code: 200 };
    })
    .catch(err => console.log(err));
};

const create = (values, options) => {
  return Reaction.create(values, options).catch(err => {
    throw ErrorFunctions.error400(err);
  });
};

const destroy = options => {
  const where = {
    where: {
      uuid: options.uuid
    }
  };
  return Reaction.destroy(where).then(result => {
    ErrorFunctions.error404(result);
    return result;
  });
};

module.exports = { create, findAll, findByUUID, destroy, findByObjectUUID };
