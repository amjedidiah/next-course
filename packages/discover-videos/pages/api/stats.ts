import { getLoginSession } from "lib/auth.lib"
import {
  getVideoStat,
  HasuraVideoStat,
  insertVideoStat,
  updateVideoStat,
} from "lib/hasura.lib"
import { NextApiRequest, NextApiResponse } from "next"

export default async function stats(req: NextApiRequest, res: NextApiResponse) {
  const isGet = req.method === "GET"
  const isPost = req.method === "POST"
  const isPatch = req.method === "PATCH"
  if (!(isGet || isPost || isPatch)) return res.status(405).end()

  // Get issuer
  const session = await getLoginSession(req)
  const user_id =
    session?.["https://hasura.io/jwt/claims"]?.["x-hasura-user-id"]
  if (!user_id) return res.status(401).json({ error: "Not authenticated" })

  // Get videoId
  const { video_id } = isGet ? req.query : req.body
  if (!video_id) return res.status(400).json({ error: "Missing videoId" })

  const { data } = await getVideoStat({ user_id, video_id }, session.token)
  const videoStat = data?.stats[0]

  if (isPatch && !videoStat)
    return res.status(404).json({ error: "Video not found" })

  if (isGet) return res.status(200).json({ videoStat })

  const { favourited } = req.body

  let resp
  let updatedVideo

  if (isPatch) {
    resp = await updateVideoStat(
      { favourited, user_id, video_id },
      session.token
    )
    updatedVideo = resp?.data.update_stats.returning[0]
  } else {
    resp = await insertVideoStat(
      { favourited, user_id, video_id },
      session.token
    )
    updatedVideo = resp?.data.insert_stats.returning[0] as HasuraVideoStat
  }

  if (!resp?.data)
    return res
      .status(500)
      .json({ error: `Failed to ${isPatch ? "update" : "create"} video stats` })

  return res.status(200).json({ videoStat: updatedVideo })
}
