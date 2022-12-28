import magic from "lib/magic.lib"
import { MagicUserMetadata } from "magic-sdk"
import { useEffect, useState } from "react"

export const useMagicUserMetadata = () => {
  const [userMetadata, setUserMetadata] = useState<MagicUserMetadata | null>(
    null
  )
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    const fetchUserMetadata = async () => {
      try {
        if (!magic) return

        const metadata = await magic.user.getMetadata()
        setUserMetadata(metadata)
      } catch (error) {
        console.log({ error })
      } finally {
        setIsFetching(false)
      }
    }

    fetchUserMetadata()
  }, [])

  return { userMetadata, isFetching }
}
