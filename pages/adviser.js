import { useCallback, useRef, useState } from 'react'
import Layout from '@components/layout'
import { sheetPost } from '@services/index'

const IData = { isAvailable: false, message: '', success: false }

export default function LoginPage() {
  const formRef = useRef(null)
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const submitHandler = useCallback(
    (event) => {
      event.preventDefault();

      sheetPost(form).then((data = IData) => {
        console.log('🤘 ~ getSheetInfo ~ sheetGet', data);
        if (data.success && data.isAvailable) {
          formRef.current.reset();
        }
      })
    },
    [form]
  )

  return (
    <Layout title='Adviser'>
      <form onSubmit={submitHandler} ref={formRef}>
        <input
          type={'email'}
          name='email'
          placeholder='Enter your email'
          onChange={(event) => setForm({ ...form, email: event.target.value })}
        />
        <input
          type={'password'}
          name='password'
          placeholder='Enter your password'
          onChange={(event) =>
            setForm({ ...form, password: event.target.value })
          }
        />
        <button>submit</button>
      </form>
    </Layout>
  );
}
