import { magic } from "lib/magic.lib"
import { setLoginSession } from "lib/auth"
import { NextApiRequest, NextApiResponse } from "next"

declare global {
  interface Error {
    status?: number
  }
}

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end()

  try {
    const didToken = req.headers.authorization?.slice(7)
    const metadata = await magic.users.getMetadataByToken(didToken)
    const session = { ...metadata }

    await setLoginSession(res, session)

    res.status(200).send({ done: true })
  } catch (error) {
    console.error({ error })
    if (error instanceof Error)
      res.status(error.status || 500).end(error.message)
  }
}
