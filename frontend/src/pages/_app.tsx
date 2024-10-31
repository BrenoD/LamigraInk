import { AppProps } from 'next/app';
import { GiftCardProvider } from '../context/GiftCardContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GiftCardProvider>
      <Component {...pageProps} />
    </GiftCardProvider>
  );
}

//ola

export default MyApp;
