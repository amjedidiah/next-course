import Loader from "components/loader"
import Navbar from "components/navbar"
import useMagicUserMetadata from "hooks/use-magic-user"
import { Magic, RPCError, RPCErrorCode } from "magic-sdk"
import Head from "next/head"
import { useRouter } from "next/router"
import { useCallback, useEffect, useMemo, useState } from "react"
import styles from "styles/login.module.scss"

export default function Login() {
  const { userMetadata, isLoading } = useMagicUserMetadata({
    redirectTo: "/",
    redirectIfFound: true,
  })
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const validationMessage = useMemo(() => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (email && !emailRegex.test(email))
      return "Please enter a valid email address"

    return ""
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

      const body = { email }

      try {
        setLoading(true)
        const magic = new Magic(
          process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY as string
        )
        const didToken = await magic.auth.loginWithMagicLink(body)

        const res = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${didToken}`,
          },
          body: JSON.stringify(body),
        })

        if (!res.ok) throw new Error(await res.text())

        // Head to home
        router.push("/")
      } catch (error) {
        console.error({ error })
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
        setLoading(false)
      }
    },
    [buttonIsDisabled, email, router]
  )

  if (!isLoading && userMetadata) return <Loader />

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
