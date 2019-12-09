const Reaction = require('./reaction');
const json = require('./reaction.json');
const { ErrorFunctions, SuccessFunctions } = require('../functions');
const {
  ReactionSchema,
  BasicQuerySchema,
  queryFindByUUIDParamSchema,
  queryGetTypeReactionUUIDFromObjectUUIDSchema,
  queryFindByObjectUUIDSchema
} = require('./reactions.validator');

const {
  response400,
  response200,
  response416,
  response206,
  response403,
  response500,
  response401,
  response201,
  response204,
  response404
} = require('../responses');

const responses = {};
responses.resp200 = response200(json);
responses.resp206 = response206(json);
responses.resp403 = response403;
responses.resp416 = response416;
responses.resp500 = response500;
responses.resp400 = response400;
responses.resp401 = response401;
responses.resp201 = response201;
responses.resp204 = response204;
responses.resp404 = response404;

const ReactionRoute = [
  {
    method: 'GET',
    path: '/reactions/',
    handler(request, h) {
      return Reaction.findAll(request)
        .then(result => SuccessFunctions.successCodeChange(h, result))
        .catch(err => ErrorFunctions.errorCodeChange(h, err));
    },
    options: {
      validate: {
        query: BasicQuerySchema
      },
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
    method: 'POST',
    path: '/reactions/',
    handler(request, h) {
      return Reaction.create(request.payload)
        .then(result => SuccessFunctions.successCodeChange(h, result))
        .catch(err => ErrorFunctions.errorCodeChange(h, err));
    },
    options: {
      validate: {
        payload: ReactionSchema
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
    method: 'GET',
    path: '/objects/{objectUuid}/typeReactions',
    handler(request, h) {
      return Reaction.findByObjectUUID(request.params.objectUuid, request.query)
        .then(result => SuccessFunctions.successCodeChange(h, result))
        .catch(err => ErrorFunctions.errorCodeChange(h, err));
    },
    options: {
      validate: {
        params: queryGetTypeReactionUUIDFromObjectUUIDSchema,
        query: queryFindByObjectUUIDSchema
      },
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
    method: 'DELETE',
    path: '/reactions/{uuid}',
    handler(request, h) {
      return Reaction.destroy(request.params)
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
            ...responses.resp401,
            ...responses.resp403,
            ...responses.resp500
          },
          payloadType: 'form'
        }
      },
      tags: ['api']
    }
  }
];

module.exports = ReactionRoute;
