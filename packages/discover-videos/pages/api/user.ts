import { getLoginSession } from "lib/auth.lib"
import { getUser } from "lib/hasura.lib"
import { NextApiRequest, NextApiResponse } from "next"

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end()

  const session = await getLoginSession(req)

  if (!session) return res.status(401).json({ error: "Not authenticated" })

  const { data } = await getUser(
    session?.["https://hasura.io/jwt/claims"]?.["x-hasura-user-id"] as string,
    session.token
  )

  const user = data?.users[0]

  res.status(200).json({ user })
}
