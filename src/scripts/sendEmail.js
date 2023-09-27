// This script is used to send an email for some certain reason.
require("dotenv").config();
const nodemailer = require("nodemailer");
const { connectToDb } = require("../db");

// Configuration
const targetEmails = ["piyush.vaviya27@gmail.com"]; // list of emails
const subject = "Hello from Node!";
const description = "Node JS is awesome!";

const sendMail = (transporter, mailOptions) =>
  new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  });

// Business logic - Do not change!
const sendEmails = async () => {
  await connectToDb();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  for (const target of targetEmails) {
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: target,
      subject: subject,
      text: description,
    };

    await sendMail(transporter, mailOptions);
    console.log(`Email sent successfully to "${target}"!`);
  }
};

sendEmails()
  .then(() => console.log("All emails has been sent successfully!"))
  .catch(console.error);
