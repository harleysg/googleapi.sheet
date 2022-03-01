import { useCallback, useRef, useState, useEffect } from 'react'
import { useSession, getSession } from 'next-auth/react'

import { SHEET_API_ACTIONS } from '@constants/index'
import { sheetPost, getNameToEmail } from '@services/index'
import Layout from '@components/layout'
import Table from '@components/table'

export default function () {
  const { data: session } = useSession()
  const formRef = useRef(null)
  const [pageInfo, setPageInfo] = useState({
    title: 'loading...',
    table: {
      header: [],
      body: []
    }
  })

  const submitHandler = useCallback(
    (event) => {
      event.preventDefault()

      session &&
      sheetPost({
        user: session?.user?.email,
        event: SHEET_API_ACTIONS.GET_ADVISER_CLIENTS
        }).then((data) => {
          data && setPageInfo(page => ({...page, table: data.table}))
        })
    },
    [session, setPageInfo]
  )
  
  useEffect(() => {
    session && sheetPost({
      user: session?.user?.email,
      event: SHEET_API_ACTIONS.GET_ADVISER_CLIENTS
      }).then((data) => {
        data &&
        setPageInfo((page) => ({
          ...page,
          table: data.table,
          title: `Hola ${getNameToEmail(session?.user?.email)}`,
        }))
      })
  }, [setPageInfo])

  if (!session) {
    return (
      <Layout title='Adviser'>
        <h1>Private page, should be sign in to continue.</h1>
      </Layout>
    )
  }

  return (
    <Layout title='Adviser'>
      <h1>{pageInfo.title}</h1>
      <form onSubmit={submitHandler} ref={formRef}>
        <button className='c-btn'>Refresh list</button>
      </form>
      <Table data={pageInfo.table}/>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)

  return {
    props: {
      session
    }
  }
}