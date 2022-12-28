import "styles/globals.scss"
import type { AppProps } from "next/app"
import font from "../utils/font.util"
import { useEffect } from "react"
import { useMagicUserMetadata } from "hooks/use-magic-user"
import { useRouteChange } from "hooks/use-route-change"
import Loader from "components/loader"

export default function App({ Component, pageProps }: AppProps) {
  const { userMetadata, isFetching } = useMagicUserMetadata()
  const { isRouteChanged, router } = useRouteChange()

  useEffect(() => {
    if (!(isFetching || userMetadata)) router.push("/login")
    if (!isFetching && userMetadata) router.push("/")

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, userMetadata])

  if (!isRouteChanged) return <Loader />

  return (
    <main className={font.className}>
      <Component {...pageProps} />
    </main>
  )
}
