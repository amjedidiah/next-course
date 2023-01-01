import "styles/globals.scss"
import type { AppProps } from "next/app"
import font from "utils/font.util"
import { useRouteChange } from "hooks/use-route-change"
import Loader from "components/loader"
import useMagicUserMetadata from "hooks/use-magic-user"

export default function App({ Component, pageProps }: AppProps) {
  const { isRouteChanging } = useRouteChange()
  const { isLoading } = useMagicUserMetadata()

  if (isRouteChanging || isLoading) return <Loader />

  return (
    <main className={font.className}>
      <Component {...pageProps} />
    </main>
  )
}
