const fastify = require("fastify")();
const fastifyPostgres = require("fastify-postgres");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { Users } = require("./sequalize.js");
const {
  registrationValidation,
  sendResetPasswordSMS,
} = require("./services/services.js");

// Добавляем jwt токен
// Секретное слово
const JWT_SECRET = "onik";

fastify.register(require("@fastify/cors"), {
  // Настройки CORS
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["content-type"],
});

// Connect BD
const connectServer = async () => {
  fastify.register(fastifyPostgres, {
    connectionString: "postgresql://postgres:admin@localhost:5432/postgres",
    loggin: console.log,
  });
};
connectServer();

//Авторизация и проверка пользователя
fastify.post("/Authorization", async (req, reply) => {
  try {
    const { telephone, password } = req.body;
    const user = await Users.findOne({ where: { telephone } });

    // Если пользователь не найден, возвращаем ошибку
    if (!user) {
      return reply.status(401).send({ error: "Invalid phone or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return reply.status(401).send({ error: "Invalid phone or password" });
    }

    // Генерируем JWT токен
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Сохраняем токен в куках
    reply.header(
      "Set-Cookie",
      `auth_token=${token}; HttpOnly; Secure; Max-Age=3600`
    );
    return reply.send({ user: user.toJSON().telephone, token });
  } catch (error) {
    return reply.status(500).send({ error: "Error finding user" });
  }
});

// Регистрация пользователя
fastify.post("/Registration", async (req, reply) => {
  try {
    const { telephone, password } = req.body;

    if (registrationValidation(telephone, password)) {
      return reply.status(400).send({ error: "Invalid phone or password" });
    }

    // Проверяем, есть ли пользователь с таким же телефоном
    const existingUser = await Users.findOne({ where: { telephone } });
    if (existingUser) {
      return reply
        .status(400)
        .send({
          error: "Пользователь с таким номером телефона уже существует",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Users.create({
      telephone,
      password: hashedPassword,
    });

    // Генерируем JWT токен
    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Сохранение токена в куках
    reply.header(
      "Set-Cookie",
      `auth_token=${token}; HttpOnly; Secure; Max-Age=3600`
    );
    console.log("Новый пользователь создан: ", newUser.toJSON().telephone);
    return reply.send(newUser.toJSON().telephone);
  } catch (error) {
    return reply
      .status(500)
      .send({ error: "Ошибки при создании пользователя" });
  }
});

// Reset password
fastify.post("/reset-password", async (req, res) => {
  const telephone = req.body.telephone;

  try {
    const user = await Users.findOne({
      where: {
        telephone,
      },
    });

    if (!user) {
      return res.status(404).send("Не существующий пользователь");
    }

    // Generation token recovery
    const resetToken = crypto.randomBytes(32).toString("hex");

    await Users.update(
      {
        reset_token: resetToken,
        reset_token_expires: new Date(Date.now() + 3600000), // 1 час
      },
      {
        where: {
          telephone,
        },
      }
    );

    // send SMS of recovery
    await sendResetPasswordSMS(user.telephone, resetToken);
    res.send(
      "Password reset instructions have been sent to your phone number."
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Error occurred");
  }
});

fastify.listen({ port: 4000, host: "0.0.0.0" }, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Сервер начал работу на 8000 порту");
  }
});
