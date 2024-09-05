const fastify = require("fastify")();
const fastifyPostgres = require("@fastify/postgres");
const { router } = require("./routes/routes.js");
const cookiePlugin = require("fastify-cookie");
const authMiddleware = require("./middleware/auth-middleware.js");
require("dotenv").config();

fastify.register(cookiePlugin, {
  secret: process.env.COOKIE_SECRET, // Секретный ключ для подписи cookie
  parseOptions: {}, // Дополнительные параметры для парсинга cookie
});

fastify.register(require("@fastify/cors"), {
  // Настройки CORS
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["content-type", "Authorization"],
  credentials: true,
});

const connectServer = async () => {
  fastify.register(fastifyPostgres, {
    connectionString: "postgresql://postgres:admin@localhost:5432/postgres",
  });
};

connectServer();

// Не защищённые маршруты
fastify.register(
  (instance, opts, done) => {
    instance.route(router().registration);
    instance.route(router().authorization);
    instance.route(router().refresh);
    instance.route(router().activate);
    done();
  },
  { prefix: "/" }
);

// Защищённые маршруты
fastify.register(
  (instance, opts, done) => {
    instance.addHook("preHandler", authMiddleware);
    instance.route(router().takeCoin);
    instance.route(router().logout);
    instance.route(router().userMe);
    instance.route(router().profile);
    done();
  },
  { prefix: "/" }
);

fastify.listen({ port: 4000, host: "0.0.0.0" }, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Сервер начал работу на 4000 порту");
  }
});
