import "styles/globals.scss"
import type { AppProps } from "next/app"
import Footer from "components/footer"
import Head from "next/head"
import { useRouter } from "next/router"
import { useMemo } from "react"
import getPageTitle from "utils/get-title.util"
import { StoreProvider } from "context/store.context"
import fonts from "utils/fonts.util"

export default function App({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter()
  const pageTitle = useMemo(
    () => `${getPageTitle(asPath)} | Coffee Connoisseur`,
    [asPath]
  )

  return (
    <StoreProvider>
      <>
        <Head>
          <title>{pageTitle}</title>
          <meta
            name="description"
            content="Coffee Connoisseur built by Jedidiah Amaraegbu"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={fonts.className}>
          <Component {...pageProps} />
          <Footer />
        </main>
      </>
    </StoreProvider>
  )
}
