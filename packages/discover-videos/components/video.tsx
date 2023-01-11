import { getVideo, getVideoStat, VideoFull } from "lib/videos.lib"
import styles from "styles/video.module.scss"
import cls from "classnames"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/router"
import Icons from "./icons/icons"

interface VideoProps {
  fallbackId?: string
  video?: VideoFull | null
}

export default function Video(props: VideoProps) {
  const [video, setVideo] = useState<VideoFull | null | undefined>(props.video)
  const isHome = useRouter().pathname === "/"
  const [isLiked, setIsLiked] = useState<Boolean | undefined>(undefined)

  useEffect(() => {
    const fetchVideo = async (videoId: string) => {
      const data = await getVideo(videoId)
      setVideo(data)
    }

    if (props.fallbackId) fetchVideo(props.fallbackId)
  }, [props.fallbackId])

  useEffect(() => {
    const fetchIsLiked = async (videoId: string) => {
      const favourited = await getVideoStat(videoId)

      if (favourited === undefined) return
      setIsLiked(Boolean(favourited))
    }

    if (video?.id) fetchIsLiked(video.id)
  }, [video?.id])

  const handleIsLiked = useCallback(async (favourited: Boolean) => {
    const updatedVideo = fetch("api/stats", {
      method: isLiked !== undefined ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        video_id: video?.id,
        favourited,
        watched: false,
      }),
    })

    setIsLiked(favourited)

    updatedVideo
      .then((res) => res.json())
      .then((data) => {
      }).catch(() => setIsLiked(!favourited))
  }, [isLiked, video?.id])

  if (!video) return null

  const { title, description, publishTime, channelTitle, viewCount, id } = video

  return (
    <div className={styles[isHome ? "container" : "containerFull"]}>
      <iframe
        id="ytplayer"
        typeof="text/html"
        className={styles[isHome ? "videoPlayer" : "videoPlayerFull"]}
        width="100%"
        height="360"
        src={`https://www.youtube.com/embed/${id}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
        frameBorder="0"
      />
      <Icons liked={isLiked} onSetLiked={handleIsLiked} />
      <div className={styles.modalBody}>
        <div
          className={
            styles[isHome ? "modalBodyContent" : "modalBodyContentFull"]
          }
        >
          <div className={isHome ? styles.col1 : ""}>
            <p className={styles.publishTime}>{publishTime}</p>
            <p className={styles.title}>{title}</p>
            <p className={styles.description}>{description}</p>
          </div>
          <div className={styles.col2}>
            <p className={cls(styles.subText, styles.subTextWrapper)}>
              <span className={styles.textColor}>Producer: </span>
              <span className={styles.channelTitle}>{channelTitle}</span>
            </p>
            <p className={cls(styles.subText, styles.subTextWrapper)}>
              <span className={styles.textColor}>View Count: </span>
              <span className={styles.channelTitle}>{viewCount}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
