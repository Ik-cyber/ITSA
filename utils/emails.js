import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendEmail = (email, data) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  transporter.sendMail({
    from: '"ITSA" <numterminal@gmail.com>',
    to: email,
    subject: "ITSA app",
    text: `BodyT`,
    html: `Name: ${data.name}, Password: ${data.password}`,
  });

};

export default sendEmail;
