import useSWR from "swr"
import { MagicUserMetadata } from "magic-sdk"
import { useEffect } from "react"
import router from "next/router"

type MetadataParams = {
  redirectTo?: string
  redirectIfFound?: boolean
}

const fetcher = (url: string) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => ({ user: data?.user || null }))

export default function useMagicUserMetadata({
  redirectTo,
  redirectIfFound,
}: MetadataParams = {}) {
  const {data, error} = useSWR("/api/user", fetcher)
  const user: MagicUserMetadata = data?.user
  const finished = Boolean(data)
  const hasUser = Boolean(user)

  useEffect(() => {
    // rome-ignore lint/complexity/useSimplifiedLogicExpression: <explanation>
    if (!redirectTo || !finished) return
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser)
    )
      router.push(redirectTo)
  }, [redirectTo, redirectIfFound, finished, hasUser])

  return {userMetadata: error ? null : user, isLoading: !finished }
}
