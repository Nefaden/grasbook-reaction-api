const Joi = require('@hapi/joi');

const ReactionSchema = Joi.object({
  typeReactionUuid: Joi.string()
    .guid()
    .required(),

  userUuid: Joi.string()
    .guid()
    .required(),

  objectUuid: Joi.string()
    .guid()
    .required(),

  objectType: Joi.string()
    .min(1)
    .max(10)
    .required()
});

const queryFindByUUIDParamSchema = {
  uuid: Joi.string()
    .guid()
    .description("Reaction's uuid")
};

const queryFindByObjectUUIDSchema = {
  objectType: Joi.string()
    .required()
    .description("Object's type")
};

const queryGetTypeReactionUUIDFromObjectUUIDSchema = {
  objectUuid: Joi.string()
    .guid()
    .required(),
  sort: Joi.string().min(1)
};

const BasicQuerySchema = {
  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .description("Reaction's limit")
    .positive()
    .default(10),

  page: Joi.number()
    .integer()
    .min(0)
    .description("Reaction's page")
    .default(0),

  sort: Joi.string().min(1),
  sortColumn: Joi.string().min(4)
};

module.exports = {
  ReactionSchema,
  queryGetTypeReactionUUIDFromObjectUUIDSchema,
  BasicQuerySchema,
  queryFindByUUIDParamSchema,
  queryFindByObjectUUIDSchema
};
