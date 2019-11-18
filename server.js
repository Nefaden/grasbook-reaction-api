require('dotenv').config();
const Hapi = require('@hapi/hapi');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: () => {
      return 'Hello World!';
    }
  });

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
