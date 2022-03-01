import Link from './navLink'
import { signIn, signOut } from 'next-auth/react'
import Brand from './brand'

export default function Header({ session }) {
  return (
    <header className='o-header'>
      <div className='o-header_wrapper o-wrapper'>
        <Brand size='2rem' />
        <nav className='o-header_nav'>
          {session ? (
            <>
              <Link activeClassName='is-active' href='/adviser'>
                <a className='o-header_link'>Adviser</a>
              </Link>
              <button className='o-header_btn' onClick={() => signOut({callbackUrl: "/"})}>Sign out</button>
            </>
          ) : (
            <>
              <Link activeClassName='is-active' href='/'>
                <a className='o-header_link'>Home</a>
              </Link>
              <button className='o-header_btn is-soft' onClick={() => signIn()}>Sign in</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
