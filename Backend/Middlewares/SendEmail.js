const nodeMailer = require("nodemailer");

const SendEmail = async (options) => {
    
    //const transporter = nodeMailer.createTransport({
       //host: process.env.HOST,
       // port: process.env.PORT,
       // service: process.env.SERVICE,
       // secure: true,
       // auth: {
       //     user: process.env.USER_MAIL,
       //    pass: process.env.USER_PASS, 
       //}
   // });

   var transport = nodeMailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "cd15d962edd207",
      pass: "1f28375a6ae351"
    }
  });

    const  mailOptions = {
        from: 'AmitGanjre',
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transport.sendMail(mailOptions);
};

module.exports = SendEmail;