const nodeMailer = require("nodemailer");

const defaultEmailData = { from: "noreply@iamctholic.org" };

exports.sendEmail = emailData => {
    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        pool:true,
        port:587,
        secure:false, // upgrade later with STARTTLS
        //requireTLS: true,
        debug:true,
        logger:true,
        auth: {
            user: "devetest2020@gmail.com",
            pass: "test2020_"
        },
        tls: {
            rejectUnauthorized: false
          }
       /* host: "smtp.gmail.com",
        port: 587,
        secure:false,
        requireTLS: true,
        auth: {
            user: "yusuffabduljeleel@gmail.com",
            pass: "abduljelelforreal"
        }
        */
    });
    return transporter
        .sendMail(emailData)
        .then(info => console.log(`Message sent: ${info.response}`))
        .catch(err => console.log(`Problem sending email: ${err}`));
};
