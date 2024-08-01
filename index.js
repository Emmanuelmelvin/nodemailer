const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendEmail() {
    // Create a transporter object
    let transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER, // your email
            pass: process.env.EMAIL_PASS  // your email password
        },
        tls: {
            ciphers: 'SSLv3'
        }
    });

    // Set up email data
    let mailOptions = {
        from: `"Emmanuel Chidi" <${process.env.EMAIL_USER}>`, // sender address with your name
        to: 'emmachid@outlook.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    try {
        // Send mail
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

sendEmail();
