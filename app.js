const nodemailer = require('nodemailer')
const { google } = require("googleapis")

require.dotenv()

// Replace the following values with your own credentials
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  REDIRECT_URI
)

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })

const sendMail = async () {
    try{
        const accessToken = await oAuth2Client.getAccessToken()
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.SENDER_EMAIL,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken
            }
        })
    } catch(error){
        return error
    }
}