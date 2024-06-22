import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendEmail = (email, data) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  transporter.sendMail({
    from: '"ITSA" <numterminal@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "ITSA app", // Subject line
    text: `BodyT`, // plain text body
    html: `Name: ${data.name}, Password: ${data.password}`, // html body
  });

  console.log("Sent Email")
};

export default sendEmail
