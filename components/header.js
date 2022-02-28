import Link from './navLink'
import { signIn, signOut } from 'next-auth/react'

export default function Header({ session }) {
  return (
    <header className='o-header'>
      <div className='o-header_wrapper o-wrapper'>
        <nav className='o-header_nav'>
          <Link activeClassName='is-active' href='/'>
            <a className='o-header_link'>Home</a>
          </Link>
          {session ? (
            <>
              <Link activeClassName='is-active' href='/adviser'>
                <a className='o-header_link'>Adviser</a>
              </Link>
              <button onClick={() => signOut()}>Sign out</button>
            </>
          ) : (
            <button onClick={() => signIn()}>Sign in</button>
          )}
        </nav>
      </div>
    </header>
  );
}
