import { useCallback } from 'react';
import Layout from '@components/layout';
import { sheetGet } from '@services/index';

const IData = { data: {}, message: '', success: false, table: {} };

export default function Home() {
  const getSheetInfo = useCallback(() => {
    sheetGet().then((data = IData) => {
      console.log('🤘 ~ getSheetInfo ~ sheetGet', data);
    });
  }, []);

  return (
    <Layout>
      <h1>
        Welcome to <a href='https://nextjs.org'>Next.js!</a>
      </h1>
      <button onClick={getSheetInfo}>Get sheet info</button>
    </Layout>
  );
}
