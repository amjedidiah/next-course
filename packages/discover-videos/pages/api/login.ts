import { magic } from "lib/magic.lib"
import { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"
import { MAX_AGE, setTokenCookie } from "lib/auth-cookies.lib"
import { getUser, insertUser } from "lib/hasura.lib"
import { MagicUserMetadata } from "@magic-sdk/admin"

declare global {
  interface Error {
    status?: number
  }
}

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end()

  try {
    // Confirm Authorization header is present
    const auth = req.headers.authorization
    if (!auth?.startsWith("Bearer "))
      throw new Error("Missing Authorization Header")

    // Confirm DID Token is present
    const didToken = auth.slice(7)
    if (!didToken) throw new Error("Missing DID Token")

    // Validate DID Token
    const metadata: MagicUserMetadata = await magic.users.getMetadataByToken(
      didToken
    )

    // Create JWT
    const token = jwt.sign(
      {
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["user"],
          "x-hasura-default-role": "user",
          "x-hasura-user-id": metadata.issuer,
        },
      },
      process.env.TOKEN_SECRET as string,
      { expiresIn: MAX_AGE }
    )

    // Validate issuer
    if (!metadata.issuer) throw new Error("No issuer")

    // Check if user exists
    const { data, errors } = await getUser(metadata.issuer, token)
    if (errors) throw new Error(errors[0].message)
    const userExists = data?.users.length > 0
    if (!userExists) {
      const { errors } = await insertUser(metadata, token)
      if (errors) throw new Error(errors[0].message)
    }

    // Set cookie
    setTokenCookie(res, token)

    res.status(200).send({ done: true })
  } catch (error) {
    console.error({ error })
    if (error instanceof Error)
      res.status(error.status || 500).end(error.message)
  }
}
