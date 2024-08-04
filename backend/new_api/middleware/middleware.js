// const jwt = require('jsonwebtoken');

// const JWT_SECRET = 'onik';

// const authMiddleware = async (req, reply, done) => {
//   try {
//     // Получение токена из куков браузера
//     const token = req.cookies.auth_token;

//     if (!token) {
//       // Если нету токена, отправляем ошибку
//       return reply.status(401).send({ error: 'Не авторизован' });
//     }
//     // Проверка и декодирование токена
//     const decoded = jwt.verify(token, JWT_SECRET);

//     // Возвращаем индентификатор пользователя в request
//     req.userId = decoded.userId;

//     done();
//   } catch (error) {
//     return reply.status(401).send({ error: 'Не авторизован ' });
//   }
// }

// module.exports = authMiddleware;



// Это всё под вопросом