import nodemailer from "nodemailer";
import process from "process";

const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendEmail({
    from: process.env.EMAIL,
    to,
    subject,
    html,
  });
};

export default sendEmail;
