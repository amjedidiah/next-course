import "styles/globals.scss";
import type { AppProps } from "next/app";
import Footer from "components/footer/footer";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta
          name="description"
          content="Coffee Connoisseur built by Jedidiah Amaraegbu"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}