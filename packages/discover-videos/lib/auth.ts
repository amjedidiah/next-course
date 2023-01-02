import Iron from "@hapi/iron"
import { MAX_AGE, setTokenCookie, getTokenCookie } from "./auth-cookies"
import { NextApiRequest, NextApiResponse } from "next"

interface Session {
  maxAge: number
  createdAt: number
  issuer: string
}

const TOKEN_SECRET = process.env.TOKEN_SECRET as string

export const setLoginSession = async (
  res: NextApiResponse,
  session: Session
) => {
  try {
    const createdAt = Date.now()

    // Create a session object with a max age that we can validate later
    const obj = { ...session, createdAt, maxAge: MAX_AGE }
    const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults)

    // Set the cookie
    setTokenCookie(res, token)
  } catch (error) {
    console.error({ error })
  }
}

export const getLoginSession = async (req: NextApiRequest) => {
  try {
    const token = getTokenCookie(req)
    if (!token) return

    const session: Session = await Iron.unseal(
      token,
      TOKEN_SECRET,
      Iron.defaults
    )
    const expiresAt = session.createdAt + session.maxAge * 1000

    // Validate the expiration date of the session
    if (Date.now() > expiresAt) throw new Error("Session expired")

    return session
  } catch (error) {
    console.error({ error })
    return null
  }
}
