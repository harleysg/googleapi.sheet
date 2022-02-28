import { useCallback } from 'react'
import { useSession } from 'next-auth/react'

import Layout from '@components/layout'
import { sheetGet } from '@services/index'

const IData = { data: {}, message: '', success: false, table: {} }

export default function Home() {
  const { data: session } = useSession()
  const getSheetInfo = useCallback(() => {
    session &&
      sheetGet().then((data = IData) => {
        console.log('🤘 ~ getSheetInfo ~ sheetGet', data);
      })
  }, [session])

  return (
    <Layout>
      <h1>
        Welcome to <a href='https://nextjs.org'>Next.js!</a>
      </h1>
      {session && <button onClick={getSheetInfo}>Get sheet info</button>}
    </Layout>
  );
}
