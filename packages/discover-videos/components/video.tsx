import { getVideo, VideoFull } from "lib/videos.lib"
import styles from "styles/video.module.scss"
import cls from "classnames"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

interface VideoProps {
  fallbackId?: string
  video?: VideoFull | null
}

export default function Video(props: VideoProps) {
  const [video, setVideo] = useState<VideoFull | null | undefined>(props.video)
  const isHome = useRouter().pathname === "/"

  useEffect(() => {
    const fetchVideo = async () => {
      if (!props.fallbackId) return

      const data = await getVideo(props.fallbackId)
      console.log({ data })
      setVideo(data)
    }

    fetchVideo()
  }, [props.fallbackId])

  if (!video) return null

  const { title, description, publishTime, channelTitle, viewCount, id } = video

  return (
    <div className={isHome ? styles.container : styles.containerFull}>
      <iframe
        id="ytplayer"
        typeof="text/html"
        className={isHome ? styles.videoPlayer : styles.videoPlayerFull}
        width="100%"
        height="360"
        src={`https://www.youtube.com/embed/${id}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
        frameBorder="0"
      />
      <div className={styles.modalBody}>
        <div className={isHome ? styles.modalBodyContent : styles.modalBodyContentFull}>
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
