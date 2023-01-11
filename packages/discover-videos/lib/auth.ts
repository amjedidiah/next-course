import jwt from "jsonwebtoken"
import { getTokenCookie } from "./auth-cookies"
import { NextApiRequest } from "next"
import { MagicUserMetadata } from "@magic-sdk/admin"

interface SessionPayload extends MagicUserMetadata {
  iat: number
  exp: number
  ["https://hasura.io/jwt/claims"]: {
    "x-hasura-allowed-roles": string[]
    "x-hasura-default-role": string
    "x-hasura-user-id": string
  }
}

const TOKEN_SECRET = process.env.TOKEN_SECRET as string

export const getLoginSession = async (req: NextApiRequest) => {
  try {
    const token = getTokenCookie(req)
    if (!token) return null

    const session = (await jwt.verify(token, TOKEN_SECRET)) as SessionPayload

    // Validate the expiration date of the session
    if (Date.now() / 1000 > session.exp) throw new Error("Session expired")

    const data = {...session, token}

    return data
  } catch (error) {
    console.error({ error })
    return null
  }
}
