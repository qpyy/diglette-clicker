
const registrationValidation = (telephone, password) => {
  const phoneRegex = /^\+?\d{1,3}?[-\s]?\(?\d{1,3}\)?[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

  if (phoneRegex.test(telephone) && passwordRegex.test(password)) {
    return false;
  } else {
    return true;
  }
};

// const sendResetPasswordSMS = async (telephone, resetToken) => {
//   try {
//     await smsAeroClient.send(telephone, `Click the following link to reset your password: https://your-website.com/reset-password?token=${resetToken}`);
//     console.log(`SMS sent to ${telephone}`);
//   } catch (error) {
//     if (error instanceof SmsAeroError) {
//       console.error('Не удалось из-за ошибки SmsAero:', error.message);
//     } else if (error instanceof SmsAeroHTTPError) {
//       console.error('Не удалось отправить код из-за HTTP ошибки:', error.message);
//     } else {
//       console.error('Произошла неизвестная ошибка', error);
//     }
//   }
// }

// Это регулярное выражение проверяет, что пароль:

// 1. Содержит как минимум одну строчную букву ([a-z])
// 2. Содержит как минимум одну заглавную букву ([A-Z])
// 3. Содержит как минимум одну цифру (\d)
// 4. Содержит как минимум один специальный символ (!@#$%^&*(),.?":{}|<>)
// 5. Содержит как минимум 8 символов ({8,})

// Это регулярное выражение проверяет, что номер телефона:

// 1. ^ - начало строки
// 2. (\+7|7|8)? - опциональный код страны (может быть +7, 7 или 8)
// 3. (\d{3}) - трехзначный код города
// 4. (\d{3}) - три цифры местного номера
// 5. (\d{2}) - две цифры первой пары
// 6. (\d{2}) - две цифры второй пары
// 7. $ - конец строки


module.exports = { registrationValidation };