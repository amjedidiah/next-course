import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"

export const useRouteChange = () => {
  const router = useRouter()
  const [isRouteChanging, setIsRouteChanging] = useState(false)

  const goBack = useCallback(() => router.back(), [router])

  useEffect(() => {
    router.events.on("routeChangeStart", () => setIsRouteChanging(true))
    router.events.on("routeChangeComplete", () => setIsRouteChanging(false))
    router.events.on("routeChangeError", () => setIsRouteChanging(false))

    return () => {
      router.events.off("routeChangeStart", () => setIsRouteChanging(true))
      router.events.off("routeChangeComplete", () => setIsRouteChanging(false))
      router.events.off("routeChangeError", () => setIsRouteChanging(false))
    }
  }, [router.events])

  return { isRouteChanging, goBack }
}
