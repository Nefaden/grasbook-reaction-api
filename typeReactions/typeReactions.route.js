const TypeReaction = require('./typeReactions');
const json = require('./typeReaction.json');
const { ErrorFunctions, SuccessFunctions } = require('../functions');
const {
  typeReactionSchema,
  queryFindAllParamSchema,
  queryFindByUUIDParamSchema,
  typeReactionUpdateSchema
} = require('./typeReactions.validator');
const {
  response200,
  response201,
  response204,
  response206,
  response400,
  response401,
  response403,
  response404,
  response416,
  response500
} = require('../responses');

const responses = {};
responses.resp200 = response200(json);
responses.resp201 = response201;
responses.resp204 = response204;
responses.resp206 = response206(json);
responses.resp400 = response400;
responses.resp401 = response401;
responses.resp403 = response403;
responses.resp404 = response404;
responses.resp416 = response416;
responses.resp500 = response500;

const TypeReactionRoute = [
  {
    method: 'GET',
    path: '/typeReactions',
    handler(request, h) {
      return TypeReaction.findAll(request)
        .then(result => SuccessFunctions.successCodeChange(h, result))
        .catch(err => ErrorFunctions.errorCodeChange(h, err));
    },
    options: {
      validate: queryFindAllParamSchema,
      plugins: {
        'hapi-swagger': {
          responses: {
            ...responses.resp400,
            ...responses.resp200,
            ...responses.resp206,
            ...responses.resp416,
            ...responses.resp403,
            ...responses.resp500
          },
          payloadType: 'form'
        }
      },
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/typeReactions/{uuid}',
    handler(request, h) {
      return TypeReaction.findByUUID(request.params.uuid)
        .then(result => SuccessFunctions.successCodeChange(h, result))
        .catch(err => ErrorFunctions.errorCodeChange(h, err));
    },
    options: {
      validate: {
        params: queryFindByUUIDParamSchema
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            ...responses.resp200,
            ...responses.resp403,
            ...responses.resp500,
            ...responses.resp401,
            ...responses.resp404
          },
          payloadType: 'form'
        }
      },
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/typeReactions/',
    handler(request, h) {
      return TypeReaction.create(request.payload)
        .then(result => SuccessFunctions.successCodeChange(h, result))
        .catch(err => ErrorFunctions.errorCodeChange(h, err));
    },
    options: {
      validate: {
        payload: typeReactionSchema
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            ...responses.resp201,
            ...responses.resp403,
            ...responses.resp500,
            ...responses.resp401
          },
          payloadType: 'form'
        }
      },
      tags: ['api']
    }
  },
  {
    method: 'DELETE',
    path: '/typeReactions/{uuid}',
    handler(request, h) {
      return TypeReaction.destroy(request.params)
        .then(result => SuccessFunctions.successCodeChange(h, result))
        .catch(err => ErrorFunctions.errorCodeChange(h, err));
    },
    options: {
      validate: {
        params: queryFindByUUIDParamSchema
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            ...responses.resp204,
            ...responses.resp403,
            ...responses.resp500,
            ...responses.resp401
          },
          payloadType: 'form'
        }
      },
      tags: ['api']
    }
  },
  {
    method: 'PUT',
    path: '/typeReactions/{uuid}',
    handler(request, h) {
      return TypeReaction.update(request.payload, request)
        .then(result => SuccessFunctions.successCodeChange(h, result))
        .catch(err => ErrorFunctions.errorCodeChange(h, err));
    },
    options: {
      validate: {
        params: queryFindByUUIDParamSchema,
        payload: typeReactionUpdateSchema
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            ...responses.resp200,
            ...responses.resp403,
            ...responses.resp500,
            ...responses.resp401
          },
          payloadType: 'form'
        }
      },
      tags: ['api']
    }
  }
];

module.exports = TypeReactionRoute;
