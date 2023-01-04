import { magic } from "lib/magic.lib"
import { removeTokenCookie } from "lib/auth-cookies"
import { getLoginSession } from "lib/auth"
import { NextApiRequest, NextApiResponse } from "next"

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end()

  try {
    const session = await getLoginSession(req)
    if (!session) throw new Error("Not authenticated")

    await magic.users.logoutByIssuer(session?.["https://hasura.io/jwt/claims"]?.["x-hasura-user-id"] as string)
    removeTokenCookie(res)
  } catch (error) {
    console.error({ error })
  } finally {
    res.writeHead(302, { Location: "/" })
    res.end()
  }
}
