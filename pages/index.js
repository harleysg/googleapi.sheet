
import Layout from '@components/layout'

export default function Home() {

  return (
    <Layout>
      <h1>Welcome to my GSheet</h1>
      <h2>Instructions</h2>
      <ul style={{listStyle: 'none'}}>
        <li>◉ Click to Sign in button.</li>
        <li>◉ Use your credentials to check the list relate to you.</li>
      </ul>

      <h3>TODO list</h3>
      <ul style={{listStyle: 'none'}}>
        <li>▢ Improve instructions</li>
        <li>▢ Change brand image</li>
      </ul>
    </Layout>
  );
}
