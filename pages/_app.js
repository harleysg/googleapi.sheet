import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider
      session={session}
      // Re-fetches session when window is focused
      refetchOnWindowFocus={true}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
