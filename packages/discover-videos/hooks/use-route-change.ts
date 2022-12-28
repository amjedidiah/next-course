import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export const useRouteChange = () => {
  const router = useRouter()
  const [isRouteChanged, setIsRouteChanged] = useState(false)

  useEffect(() => {
    router.events.on("routeChangeStart", () => setIsRouteChanged(false))
    router.events.on("routeChangeComplete", () => setIsRouteChanged(true))
    router.events.on("routeChangeError", () => setIsRouteChanged(true))

    return () => {
      router.events.off("routeChangeStart", () => setIsRouteChanged(false))
      router.events.off("routeChangeComplete", () => setIsRouteChanged(true))
      router.events.off("routeChangeError", () => setIsRouteChanged(true))
    }
  }, [router.events])

  return { isRouteChanged, router }
}
