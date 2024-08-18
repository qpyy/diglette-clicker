const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const nodemailer = require('nodemailer');
const { SendMailError } = require("../middleware/error-handler");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  },
});

const mailService = async (to, link) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Код подтверждения вашей почты в ${process.env.API_URL}`,
      text: '',
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center; background: radial-gradient(circle, rgba(217, 169, 108, 1) 40%, rgba(144, 100, 78, 1) 100%); padding: 40px 0;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">Для активации в diglette clicker профиля перейдите по ссылке</h1>
            <a href="${link}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px; font-size: 16px; margin-top: 20px;">Активировать</a>
          </div>
        </div>
      `
    });
    return {
      message: 'Email sent successfully',
      status: 200
    };
  } catch (err) {
    console.error('Error sending email:', err);
    throw new SendMailError(`Error sending email`, 500);
  }
};




module.exports = { mailService };