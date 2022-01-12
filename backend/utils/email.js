import nodemailer from "nodemailer";

export default async (options) => {
  //1 create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  //2 email options
  const mailOptions = {
    from: "Elias <elias@natours.io>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    //html:
  };
  //3 send the email
  await transporter.sendMail(mailOptions);
};
