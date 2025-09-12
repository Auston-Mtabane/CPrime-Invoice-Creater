import nodemailer from "nodemailer";
import dotenv from "dotenv";
import puppeteer from "puppeteer";

dotenv.config();

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
    attachments: [{ filename: "invoice.pdf", path: "./output.pdf" }],
  }; 


  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to} successfully`);
    makepdf(htmle,subject);
    return true;
  } catch (err) {
    console.log(to,subject,process.env.EMAIL_USER,process.env.EMAIL_PASS);
    console.error(`Error sending email to ${to}:`, err);
    throw err;
  }
 
}
async function makepdf(htmle,subject) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();


  await page.setContent(htmle,{waitUntil: "domcontentloaded"});
  await page.pdf({
    path: `${subject}.pdf`, 
    format: "A4",
    printBackground: true,
  });

  await browser.close();
  
}
