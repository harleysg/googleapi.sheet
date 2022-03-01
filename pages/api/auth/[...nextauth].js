import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { getSheets } from '@services/google.sheets'
import { TableFactory } from '@services/index'
import { DATABASE_SHEETS } from '@constants/index'

export default NextAuth({
  secret: process.env.NEXT_PUBLIC_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: '...@gmail.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const { email, password } = req.body
        const sheet = await getSheets({
          spreadsheetId: process.env.DATABASE_ID,
          range: DATABASE_SHEETS.ADVISERS
        })

        try {
          if (sheet.status && sheet?.data?.values) {
            const table = TableFactory(sheet.data.values)
            const userAvailable = table.body.filter(
              (row) => row[0].includes(email) && row[1].includes(password)
            )
            
            // Hack con el valor de la tabla actual
            if (userAvailable.length > 0) {
              return {
                name: userAvailable[0][4],
                email
              }
            }

            throw new Error('Invalid user')
          }
          throw new Error('Error sheet connection')
        } catch {
          return null
        }
      }
    })
  ]
})
