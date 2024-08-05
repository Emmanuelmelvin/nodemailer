const { google } = require('googleapis');
require('dotenv').config()

const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    REDIRECT_URI
);


const scopes = [
    'https://www.googleapis.com/auth/gmail.send',
];

const url = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
});

console.log('Authorize this app by visiting this url:', url);
