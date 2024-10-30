import { GiftCardProvider } from '../context/GiftCardContext';

function MyApp({ Component, pageProps }) {
  return (
    <GiftCardProvider>
      <Component {...pageProps} />
    </GiftCardProvider>
  );
}

export default MyApp; 