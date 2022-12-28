export interface Video {
  id: string
  title: string
  imgUrl: string
}

interface VideoData {
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
  }
}

export default async function getVideos(search?: string): Promise<Video[]> {
  try {
    const URI = !search
      ? "/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=NG"
      : `/search?part=snippet&q=${search}&type=video`
    // Fetch from YouTube API
    const videoData = await fetch(
      `https://youtube.googleapis.com/youtube/v3${URI}&key=${process.env.YOUTUBE_API_KEY}&maxResults=25`
    ).then((res) => res.json())

    if (videoData?.error) throw new Error(videoData.error.message)

    // Return the formatted video data
    return videoData.items.map((video: VideoData) => ({
      id: video?.id?.videoId || video?.id,
      title: video?.snippet?.title,
      imgUrl: video?.snippet?.thumbnails?.high?.url,
    }))
  } catch (error) {
    console.error({ error})
    return []
  }
}
