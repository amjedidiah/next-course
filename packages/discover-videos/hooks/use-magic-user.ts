import useSWR from "swr"
import { useEffect } from "react"
import router from "next/router"
import { HasuraUser } from "lib/hasura.lib"

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
  const { data, isLoading } = useSWR<{ user: HasuraUser }>("/api/user", fetcher)
  const user = data?.user
  const hasUser = Boolean(user)

  useEffect(() => {
    if (!redirectTo || isLoading) return
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser)
    )
      router.push(redirectTo)
  }, [redirectTo, redirectIfFound, hasUser, isLoading])

  return { userMetadata: user, isLoading }
}
