const fastify = require("fastify")();
// const fastifyPostgres = require("fastify-postgres");
const fastifyPostgres = require('@fastify/postgres');
const { router } = require('./routes/routes.js')
const cookiePlugin = require('fastify-cookie');
require('dotenv').config();

fastify.register(cookiePlugin, {
  secret: process.env.COOKIE_SECRET, // Секретный ключ для подписи cookie
  parseOptions: {}    // Дополнительные параметры для парсинга cookie
});

fastify.register(require("@fastify/cors"), {
  // Настройки CORS
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["content-type"],
});

const connectServer = async () => {
  fastify.register(fastifyPostgres, {
    connectionString: "postgresql://postgres:admin@localhost:5432/postgres",
    loggin: console.log,
  });
};
connectServer();

fastify.register((instance, opts, done) => {
  instance.route(router().registration);
  instance.route(router().authorization);
  done();
}, { prefix: '/diglette-clicker/' });

fastify.listen({ port: 4000 }, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Сервер начал работу на 4000 порту");
  }
});
