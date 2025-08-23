import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // load .env variables

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});



export async function sendEmail(to, subject, htmle) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: htmle,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to} successfully`);
    return true;
  } catch (err) {
    console.error(`Error sending email to ${to}:`, err);
    throw err;
  }
}
