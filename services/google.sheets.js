import { google } from 'googleapis';

const googleAuth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  scopes: [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.readonly',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/spreadsheets.readonly',
  ],
});

const sheets = () => google.sheets({
  auth: googleAuth,
  version: 'v4',
});

const getSheets = (options) => sheets().spreadsheets.values.get(options)
const appendSheets = (options) => sheets().spreadsheets.values.append(options)


export  {
  getSheets,
  appendSheets
}