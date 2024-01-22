import Mail from "nodemailer/lib/mailer";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const USERNAME = process.env.SMTP_GMAIL_USERNAME;
const PASSWORD = process.env.SMTP_GMAIL_APP_PASSWORD;

function sendEmail(to: string, subject: string, text: string, html: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: true,
    auth: {
      user: USERNAME,
      pass: PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: USERNAME,
    to: to,
    subject,
    text,
    html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("\n❌ Error sending mail!\n");
      console.log(error);
      return false;
    } else {
      console.log("\n✅ Mail sent\n");
      console.log(info.response);
      return true;
    }
  });
}

export { sendEmail };
