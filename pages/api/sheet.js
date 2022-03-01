import { getSession } from "next-auth/react"

import { getSheets } from '@services/google.sheets'
import { TableFactory } from '@services/index'
import { DATABASE_SHEETS, SHEET_API_ACTIONS } from "@constants/index";

async function getAdviserClients(req, res) {
  return getSheets({
    spreadsheetId: process.env.DATABASE_ID,
    range: DATABASE_SHEETS.CLIENTS
  })
  .then(({ data }) => {
      const { user } = req.body
      const table = TableFactory(data.values);

      if (user) {
        table.body = table.body.filter(row => row[0].includes(user))
      }

      res.status(201).json({
        success: true,
        message: 'It works!',
        data,
        table
      })
    })
  .catch((error) => {
    const { code, errors, response: data } = error;

    res.status(code).json({
      success: false,
      errors: errors || error,
      message: data.data.error.message || ''
    })
  })
}

async function handleGetTable(res, session) {
  getSheets({
    spreadsheetId: process.env.DATABASE_ID,
    range: DATABASE_SHEETS.CLIENTS
  })
  .then(({ data }) => {
      const table = session.user === 'admin' ? TableFactory(data.values) : {header: [], body: []};

      res.status(201).json({
        success: true,
        message: 'It works!',
        table,
        requestBy: session?.user?.name
      })
    })
    .catch((error) => {
      const { code, errors, response: data } = error;

      res.status(code).json({
        success: false,
        errors: errors || error,
        message: data.data.error.message || ''
      })
    })
}

async function handleLogin(req, res) {
  getSheets({
    spreadsheetId: process.env.DATABASE_ID,
    range: DATABASE_SHEETS.ADVISERS
  })
    .then(({ data }) => {
      const table = TableFactory(data.values);
      const { email, password } = req.body

      const userAvailable = table.body.some(
        (row) => row[0] === email && row[1] === password
      )

      res.status(201).json({
        success: true,
        message: 'It works!',
        isAvailable: userAvailable,
      })
    })
    .catch((error) => {
      const { code, errors, response: data } = error;

      res.status(code || 500).json({
        success: false,
        errors: errors || error,
        message: data?.data?.error?.message || ''
      })
    })
}

export default async function handler(req, res) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized!' })
  }

  if (req.method === 'GET') {
    return handleGetTable(res, session)
  }

  if (req.method === 'POST') {
    const { event } = req.body

    switch (event) {
      case SHEET_API_ACTIONS.GET_ADVISER_CLIENTS:
        return getAdviserClients(req, res)
      default:
        return handleLogin(req, res)
    }
  }

  return res.status(200).json({ message: 'Hey!' })
}