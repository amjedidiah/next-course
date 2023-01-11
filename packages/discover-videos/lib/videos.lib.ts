import videoTestData from "data/videos.json"
import { HasuraVideoStat } from "lib/hasura.lib"
import { favouritedIsNone, formatCount, formatPublishTime, formatVideo } from "utils/video.util"

export type Video = {
  id: string
  title: string
  imgUrl: string
  subTitle?: string
}

export interface VideoFull extends Video {
  description: string
  channelTitle: string
  publishTime: string
  viewCount: string
}

type VideoData = {
  items: VideoDataItem[]
  error?: {
    message: string
  }
}

export type VideoDataItem = {
  id: {
    videoId: string
  }
  snippet: {
    title: string
    thumbnails: {
      high: {
        url: string
      }
    }
    description: string
    channelTitle: string
    publishedAt: string
  }
  statistics: {
    viewCount: string
  }
}

const getVideoItems = async (search?: string) => {
  if (process.env.NODE_ENV === "development") return videoTestData.items

  try {
    const URI = !search
      ? "/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=NG"
      : `/search?part=snippet&q=${search}&type=video`
    // Fetch from YouTube API
    const { error, items } = (await fetch(
      `https://youtube.googleapis.com/youtube/v3${URI}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&maxResults=25`
    ).then((res) => res.json())) as VideoData

    if (error) throw new Error(error.message)

    return items as VideoData["items"]
  } catch (error) {
    console.error({ error })
    return
  }
}

export async function getVideos(search?: string) {
  const items = await getVideoItems(search)

  if (!items) return
  return items.map(formatVideo)
}

export async function getVideo(id: string) {
  if (!id) return
  try {
    const { error, items } = (await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
    ).then((res) => res.json())) as VideoData

    if (error) throw new Error(error.message)

    const video = items[0]

    if (!video) return
    return {
      id: video.id?.videoId || video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      imgUrl: video.snippet.thumbnails.high.url,
      channelTitle: video.snippet.channelTitle,
      publishTime: formatPublishTime(video.snippet.publishedAt),
      viewCount: formatCount(video.statistics?.viewCount),
    } as VideoFull
  } catch (error) {
    console.error({ error })
    return
  }
}

export const getBannerVideo = async () => {
  const randomNum = Math.floor(Math.random() * 25)
  const items = await getVideoItems()

  if (!items) return
  const randomVideo = items[randomNum]

  if (!randomVideo) return
  return formatVideo(randomVideo as VideoDataItem)
}

export const getStaticVideoIds = async () => {
  const items = await getVideoItems()

  if (!items) return
  return items.slice(0, 3).map((video) => video?.id?.videoId)
}

export const getFavourited = async (id: string) => {
  if (!id) return

  try {
    const { videoStat }: { videoStat?: HasuraVideoStat } = await fetch(
      `api/stats?video_id=${id}`
    ).then((res) => res.json())

    return videoStat?.favourited
  } catch (error) {
    console.error({ error })
    return
  }
}

export const updateFavourited = async ({
  newFavourited,
  favourited,
  video_id,
}: Pick<HasuraVideoStat, "favourited" | "video_id"> & {
  newFavourited: HasuraVideoStat["favourited"]
}) => {
  if (!(video_id && favourited && newFavourited)) return

  try {
    const method = favouritedIsNone(favourited) ? "POST" : "PATCH"

    const { videoStat }: { videoStat?: HasuraVideoStat } = await fetch(
      "api/stats",
      {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          video_id,
          favourited: newFavourited,
        }),
      }
    ).then((res) => res.json())

    return videoStat?.favourited
  } catch (error) {
    console.error({ error })
    return
  }
}
