/* eslint-disable no-console */
const lodash = require('lodash');
const OperatorFunctions = require('../functions/functions.operator');
const TypeReaction = require('./typeReactions.model');
const { ErrorFunctions } = require('../functions');

const findAll = options => {
  const where = { ...options.query };
  const args = { ...options };
  if (
    lodash.isNull(args.query.sortColumn) ||
    lodash.isUndefined(args.query.sortColumn)
  ) {
    args.query.sortColumn = 'name';
    args.query.sort = 'ASC';
  }

  if (
    !lodash.isUndefined(args.query.sortColumn) ||
    !lodash.isUndefined(args.query.sort)
  )
    args.query.order = [[args.query.sortColumn, args.query.sort]];

  delete where.limit;
  delete where.page;
  delete where.sort;
  delete where.sortColumn;
  args.query.offset = args.query.limit * args.query.page;
  args.query.where = where;
  return TypeReaction.findAll(args.query)
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
  return TypeReaction.findByPk(options).then(result => {
    ErrorFunctions.error404(result);
    return result;
  });
};

const create = async (values, options) => {
  const obj = { ...values };
  obj.iconUrl = await OperatorFunctions.UploadBinaryToUri(values);
  return TypeReaction.create(obj, options).catch(err => {
    throw ErrorFunctions.error400(err);
  });
};

const destroy = options => {
  const where = {
    where: {
      uuid: options.uuid
    }
  };
  return TypeReaction.destroy(where).then(result => {
    ErrorFunctions.error404(result);
    return result;
  });
};

const update = (values, options) => {
  const args = {
    ...options
  };
  const items = {
    ...values
  };
  args.where = {};
  args.where.uuid = args.params.uuid;
  return TypeReaction.update(items, args).then(result => {
    ErrorFunctions.error404(result);
    return result;
  });
};

module.exports = { findAll, findByUUID, create, destroy, update };
