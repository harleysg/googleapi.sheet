import Link from 'next/link'

export default function Header() {
  return (
    <header className='o-header'>
      <div className='o-header_wrapper o-wrapper'>
        <nav className='o-header_nav'>
          <Link href="/">
            <a className='o-header_link'>Home</a>
          </Link>
          <Link href="/login">
            <a className='o-header_link'>Login</a>
          </Link>
        </nav>
      </div>
    </header>
  )
}