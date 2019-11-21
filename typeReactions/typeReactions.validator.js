const Joi = require('@hapi/joi');

const typeReactionSchema = Joi.object({
  iconUrl: Joi.string()
    .min(1)
    .max(100)
    .required(),

  name: Joi.string()
    .alphanum()
    .min(1)
    .max(30)
    .required()
});

const typeReactionUpdateSchema = Joi.object({
  iconUrl: Joi.string()
    .min(1)
    .max(100),

  name: Joi.string()
    .alphanum()
    .min(1)
    .max(30)
});

const queryFindAllParamSchema = {
  query: {
    limit: Joi.number()
      .integer()
      .min(1)
      .max(100)
      .description("Type Reaction's limit")
      .positive()
      .default(10),

    page: Joi.number()
      .integer()
      .min(0)
      .description("Type Reaction's page")
      .default(0),

    sort: Joi.string().min(1),
    sortColumn: Joi.string().min(1),

    name: Joi.string()
      .alphanum()
      .min(1)
      .max(50)
      .description("Type reaction's name")
  }
};

const queryFindByUUIDParamSchema = {
  uuid: Joi.string()
    .guid()
    .description("Type Reaction's uuid")
};

module.exports = {
  typeReactionSchema,
  queryFindAllParamSchema,
  queryFindByUUIDParamSchema,
  typeReactionUpdateSchema
};
