/* eslint-disable no-console */
require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const authKeycloak = require('hapi-auth-keycloak');
const Pack = require('./package');
const sequelize = require('./database/connectDatabase');
const TypeReactionRoute = require('./typeReactions');
const ReactionRoute = require('./reactions');

const KEYCLOAK_URL = `${process.env.KEYCLOAK_PROTOCOL}://${process.env.KEYCLOAK_DOMAIN}/auth/realms/${process.env.KEYCLOAK_REALM}`;

const init = async () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
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
      title: 'Reaction API Documentation',
      version: Pack.version
    }
  };

  const authPluginOptions = {};

  const authStrategyOptions = {
    realmUrl: KEYCLOAK_URL,
    clientId: process.env.KEYCLOAK_CLIENT_ID,
    secret: process.env.KEYCLOAK_CLIENT_SECRET,
    userInfo: ['name', 'email']
  };

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    },
    {
      plugin: authKeycloak,
      options: authPluginOptions
    }
  ]);

  server.auth.strategy('keycloak-jwt', 'keycloak-jwt', authStrategyOptions);
  server.auth.default('keycloak-jwt');

  server.route(TypeReactionRoute);

  server.route(ReactionRoute);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
