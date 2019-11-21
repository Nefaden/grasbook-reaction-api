require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const TypeReactionRoute = require('./typeReactions');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*']
      }
    }
  });

  const swaggerOptions = {
    info: {
      title: 'User API Documentation',
      version: Pack.version
    }
  };

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ]);

  server.route({
    method: 'GET',
    path: '/',
    handler: () => {
      return 'Hello World!';
    }
  });

  server.route(TypeReactionRoute);

  await server.start();
  /* eslint no-console: ["error", { allow: ["log"] }] */
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  /* eslint no-console: ["error", { allow: ["log"] }] */
  console.log(err);
  process.exit(1);
});

init();
