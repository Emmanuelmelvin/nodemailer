const { google } = require('googleapis');
require('dotenv').config()

const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
);

oAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
});

const scopes = [
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/gmail.readonly'
];

const url = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
});

console.log('Authorize this app by visiting this url:', url);
