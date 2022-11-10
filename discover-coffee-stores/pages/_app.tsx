import "styles/globals.scss";
import type { AppProps } from "next/app";
import Footer from "components/footer";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo } from "react";

const getTitle = (path: string) => {
  const editedPath = path.slice(1);
  return editedPath
    ? editedPath.charAt(0).toUpperCase() + editedPath.slice(1)
    : "Home";
};

export default function App({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();
  const title = useMemo(
    () => `${getTitle(asPath)} | Coffee Connoisseur`,
    [asPath]
  );

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}