const nodemailer = require("nodemailer");
const sendMail = () => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    ignoreTLS: false,
    secure: false,
    auth: {
      user: "whatfuture23@gmail.com",
      pass: "@Future23",
    },
  });
  message = {
    from: "whatfuture23@gmail.com",
    to: "mahendrasinghmani222@gmail.com",
    subject: "Subject",
    text: "Selected",
  };

  transporter.sendMail(message, (err, info) => {
    console.log("hjgjh");
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};
module.exports = {
  sendMail,
};
