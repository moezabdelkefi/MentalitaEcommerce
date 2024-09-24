import { Layout } from '../components';
import '../styles/globals.css';
import { StateContext } from '../context/StateContext';
import { Urbanist } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

const font = Urbanist({ subsets: ['latin'] });

function MyApp({ Component, pageProps }) {
  return (
    <div className={font.className}>
      <StateContext>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </StateContext>
    </div>
  );
}

export default MyApp;