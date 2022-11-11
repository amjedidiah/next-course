import "styles/globals.scss";
import type { AppProps } from "next/app";
import Footer from "components/footer";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo } from "react";
import getPageTitle from "utils/get-title.util";

export default function App({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();
  const pageTitle = useMemo(
    () => `${getPageTitle(asPath)} | Coffee Connoisseur`,
    [asPath]
  );

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}