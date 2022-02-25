import { getSheets } from '@services/google.sheets';

const TableFactory = (values) => {
  const table = {};
  
  if (values) {
    table.header = values[0];
    table.body = values.slice(1);
  }

  return table
}

async function handleGetTable(res) {
  getSheets({
    spreadsheetId: process.env.DATABASE_ID,
    range: 'Hoja 1'
  })
    .then(({ data }) => {
      const table = TableFactory(data.values);

      res.status(201).json({
        success: true,
        message: 'It works!',
        data,
        table
      });
    })
    .catch((error) => {
      const { code, errors, response: data } = error;

      res.status(code).json({
        success: false,
        errors: errors || error,
        message: data.data.error.message || ''
      });
    });
}

async function handleLogin(req, res) {
  getSheets({
    spreadsheetId: process.env.DATABASE_ID,
    range: 'USERS'
  })
    .then(({ data }) => {
      const table = TableFactory(data.values);
      const { email, password } = req.body

      const userAvailable = table.body.some(row => row[0] === email && row[1] === password)

      res.status(201).json({
        success: true,
        message: 'It works!',
        isAvailable: userAvailable,
      });
    })
    .catch((error) => {
      const { code, errors, response: data } = error;

      res.status(code).json({
        success: false,
        errors: errors || error,
        message: data.data.error.message || ''
      });
    });
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return handleGetTable(res);
  }
  if (req.method === 'POST') {
    return handleLogin(req, res)
  }

  return res.status(200).json({ message: 'Hey!' });
}
