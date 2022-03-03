const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();
const { EMAIL_HOST, EMAIL_PORT, EMAIL_USERNAME, EMAIL_PASSWORD } = process.env;

const app = express();
const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD,
  },
});

app.post("/verify", async (req, res) => {
  try {
    const info = await transporter.verify();
    return res.send(info);
  } catch (error) {
    return res.send(err);
  }
});

app.post("/email", async (req, res) => {
  const info = await transporter.sendMail({
    to: "ahmad.rpl001@gmail.com",
    from: "lepasaja2022@gmail.com",
    subject: "LepasAja testing email",
    text: "Hello you are the winner",
    html: `<h1>Hello winner!</h1>`,
  });

  const emailPath = nodemailer.getTestMessageUrl(info);

  res.send({ message: "Success", emailPath });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("app is running");
});
