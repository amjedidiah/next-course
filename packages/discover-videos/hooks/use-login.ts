import { useCallback, useEffect, useMemo, useState } from "react"
import { Magic, RPCError, RPCErrorCode } from "magic-sdk"
import { useRouter } from "next/router"

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

export default function useLogin() {
  const [email, setEmail] = useState("")
  const [validationMessage, setValidationMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (email && !emailRegex.test(email))
      setValidationMessage("Please enter a valid email address")

    setValidationMessage("")
  }, [email])

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value)
    },
    []
  )

  const buttonIsDisabled = useMemo(
    () => validationMessage !== "" || email === "" || loading,
    [validationMessage, email, loading]
  )

  const handleLogin = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault()

      if (buttonIsDisabled) return

      try {
        setLoading(true)
        const magic = new Magic(
          process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY as string
        )
        const didToken = await magic.auth.loginWithMagicLink({ email })

        const res = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${didToken}`,
          },
        })

        if (!res.ok) throw new Error(await res.text())

        // Head to home
        await router.reload()
      } catch (error) {
        console.error({ error })
        if (error instanceof RPCError)
          switch (error.code) {
            case RPCErrorCode.MagicLinkFailedVerification:
            case RPCErrorCode.MagicLinkExpired:
            case RPCErrorCode.MagicLinkRateLimited:
            case RPCErrorCode.UserAlreadyLoggedIn:
              return setValidationMessage(error.message)
          }

        setValidationMessage("Something went wrong. Please try again.")
      } finally {
        setLoading(false)
      }
    },
    [buttonIsDisabled, email, router]
  )

  return {
    email,
    handleEmailChange,
    handleLogin,
    buttonIsDisabled,
    validationMessage,
    loading
  }
}
