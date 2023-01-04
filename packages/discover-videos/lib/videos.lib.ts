import videoTestData from "data/videos.json"

export interface Video {
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

type VideoDataItem = {
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

const fetchVideos = async (search?: string) => {
  const URI = !search
    ? "/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=NG"
    : `/search?part=snippet&q=${search}&type=video`
  // Fetch from YouTube API
  const data: VideoData = await fetch(
    `https://youtube.googleapis.com/youtube/v3${URI}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&maxResults=25`
  ).then((res) => res.json())

  return data
}

const formatCount = (count: string) => {
  const num = Number(count)
  if (num > 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num > 1000) return `${(num / 1000).toFixed(1)}K`
  return count
}

const formatPublishTime = (time: string) => {
  const date = new Date(time)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const diffYears = Math.floor(diff / (1000 * 3600 * 24 * 365))
  const diffMonths = Math.floor(diff / (1000 * 3600 * 24 * 30))
  const diffWeeks = Math.floor(diff / (1000 * 3600 * 24 * 7))
  const diffDays = Math.floor(diff / (1000 * 3600 * 24))
  const diffHours = Math.floor(diff / (1000 * 3600))
  const diffMinutes = Math.floor(diff / (1000 * 60))
  const diffSeconds = Math.floor(diff / 1000)

  if (diffYears > 0) return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`
  if (diffMonths > 0)
    return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`
  if (diffWeeks > 0) return `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`
  if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`
  if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`
  if (diffMinutes > 0)
    return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`
  if (diffSeconds > 0)
    return `${diffSeconds} second${diffSeconds > 1 ? "s" : ""} ago`
  return "Just now"
}

const formatVideo = (video: VideoDataItem): Video => ({
  id: video?.id?.videoId,
  title: video?.snippet?.title,
  imgUrl: video?.snippet?.thumbnails?.high?.url,
  subTitle: video?.snippet?.channelTitle
})

const getVideoData = async () =>
  process.env.NODE_ENV === "development" ? videoTestData : await fetchVideos()

export async function getVideos(search?: string) {
  try {
    const videoData =
      process.env.NODE_ENV === "development"
        ? videoTestData
        : await fetchVideos(search)

    if (videoData?.error) throw new Error(videoData.error.message)

    // Return the formatted video data
    return videoData.items.map((video) => formatVideo(video as VideoDataItem))
  } catch (error) {
    console.error({ error })
    return []
  }
}

export async function getVideo(id: string) {
  try {
    const videoData = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
    ).then((res) => res.json())

    if (videoData?.error) throw new Error(videoData.error.message)

    const video: VideoDataItem = videoData.items[0]

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
    return null
  }
}

export const getBannerVideo = async () => {
  const randomNum = Math.floor(Math.random() * 25)
  const videoData = await getVideoData()
  const randomVideo = videoData.items[randomNum]

  return formatVideo(randomVideo as VideoDataItem)
}

export const getStaticVideoIds = async () => {
  const videoData = await getVideoData()
  return videoData.items.slice(0, 3).map((video) => video?.id?.videoId)
}
