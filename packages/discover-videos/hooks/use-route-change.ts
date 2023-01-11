import { useRouter } from "next/router"
import { useEffect, useMemo, useState } from "react"
import useUserMetadata from "./use-user-metadata"

const params = {
  login: { redirectTo: "/", redirectIfFound: true },
  "not-login": { redirectTo: "/login" },
}

export default function useRouteChange() {
  const router = useRouter()
  const isLogin = router.pathname === "/login"
  const [isRouteChanging, setIsRouteChanging] = useState(false)
  const { isLoading, userMetadata } = useUserMetadata(
    isLogin ? params["login"] : params["not-login"]
  )

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

  const showLoader = useMemo(() => {
    return (
      isRouteChanging ||
      isLoading ||
      (isLogin && !isLoading && userMetadata) ||
      // rome-ignore lint/complexity/useSimplifiedLogicExpression: <explanation>
      (!isLogin && !isLoading && !userMetadata)
    )
  }, [isRouteChanging, isLoading, isLogin, userMetadata])

  return { showLoader }
}
