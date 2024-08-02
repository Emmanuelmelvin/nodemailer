const nodemailer = require('nodemailer')
const { google } = require("googleapis")

require('dotenv').config()

// Replace the following values with your own credentials
const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
)

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })

const sendMail = async () => {
    try {
        const accessToken = await oAuth2Client.getAccessToken()
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: 'smtp.google.com',
            port: '465',
            secure: 'true',
            auth: {
                type: "OAuth2",
                user: process.env.SENDER_EMAIL,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken // Ensure you have the access token
            },
            connectionTimeout: 2 * 60 * 1000, // 2 minutes
            greetingTimeout: 2 * 60 * 1000, // 2 minutes
            socketTimeout: 2 * 60 * 1000 // 2 minutes
        });

        const mailOptions = {
            from: 'EMMANUEL CHIDI <chidiemmanuel2005@gmail.com>',
            to: 'emmachid@outlook.com',
            subject: "Hello from gmail using API",
            text: "Dear Emmanuel, This message is from an API on JS",
            html: '<div>Hello bro</div>'
        }
        const result = await transporter.sendMail(mailOptions)
        return result
    } catch (error) {
        return error
    }
}

sendMail()
    .then(result => {
        console.log("Email sent successfully")
        console.log(result)
    })
    .catch(error => {
        console.log(error)
    })