import Navbar from "components/navbar"
import { useRouteChange } from "hooks/use-route-change"
import magic from "lib/magic.lib"
import { RPCError, RPCErrorCode } from "magic-sdk"
import Head from "next/head"
import { useCallback, useEffect, useMemo, useState } from "react"
import styles from "styles/login.module.scss"

export default function Login() {
  const [email, setEmail] = useState("")
  const [validationMessage, setValidationMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const { isRouteChanged, router } = useRouteChange()

  useEffect(() => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (email && !emailRegex.test(email))
      return setValidationMessage("Please enter a valid email address")

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

      if (buttonIsDisabled || !magic) return

      try {
        setLoading(true)
        await magic.auth.loginWithMagicLink({ email })

        // Head to home
        router.push("/")
      } catch (error) {
        console.log({ error })
        if (error instanceof RPCError) {
          switch (error.code) {
            case RPCErrorCode.MagicLinkFailedVerification:
            case RPCErrorCode.MagicLinkExpired:
            case RPCErrorCode.MagicLinkRateLimited:
            case RPCErrorCode.UserAlreadyLoggedIn:
              // Handle errors accordingly :)
              break
          }
        }
      } finally {
        if (isRouteChanged) setLoading(false)
      }
    },
    [buttonIsDisabled, email, isRouteChanged, router]
  )

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix | Login</title>
      </Head>
      <Navbar minimal />

      <main className={styles.main}>
        <form className={styles.wrapper}>
          <h1 className={styles.heading}>Login</h1>

          <input
            type="text"
            value={email}
            name="email"
            id="login-email"
            placeholder="Email address"
            className={styles.input}
            onChange={handleEmailChange}
          />
          {validationMessage && (
            <p className={styles["email-message"]}>{validationMessage}</p>
          )}

          <button
            onClick={handleLogin}
            className={styles.button}
            disabled={buttonIsDisabled}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </main>
    </div>
  )
}
