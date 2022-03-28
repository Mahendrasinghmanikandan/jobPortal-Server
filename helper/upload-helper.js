const nodemailer = require("nodemailer");
let result = 90;
const sendMail = async (datas) => {
  console.log(datas, "jhjg");
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "whatfuture23@gmail.com",
        pass: "@Future23",
      },
    });

    var mailOptions = {
      from: {
        name: datas.sender_email,
      },
      to: `${datas.recever_email}`,
      subject: `${datas.heading}`,
      html: `${datas.content}`,
    };
    console.log(mailOptions, "mailOptions");
    await transporter.sendMail(mailOptions).then((info, error) => {
      if (error) {
        console.log(error);
        console.log("info");
        result = 0;
      } else {
        console.log("enter");
        console.log("Email sent: " + info.response);
        result = 1;
      }
    });
    console.log(result, "result");
    if (result !== 90) {
      return result && result ? true : false;
    }
  } catch (e) {
    console.log(e);
    return 0;
  }
};

module.exports = {
  sendMail,
};
