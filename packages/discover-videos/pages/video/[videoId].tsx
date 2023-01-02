import Loader from "components/loader"
import useMagicUserMetadata from "hooks/use-magic-user"
import { getVideo, Video as VideoType, VideoFull } from "lib/videos.lib"
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next"
import { useRouter } from "next/router"
import { useCallback } from "react"
import Modal from "react-modal"
import styles from "styles/video.module.scss"
import cls from "classnames"
import Navbar from "components/navbar"

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#__next")

export const getStaticProps: GetStaticProps<{
  video: VideoFull | null
}> = async ({ params }: GetStaticPropsContext) => {
  const video = await getVideo(params?.videoId as string)

  return {
    props: {
      video,
    },
    //Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 second
    revalidate: 10, // In seconds
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const videoIds = ['cqGjhVJWtEg', 'ZlNFpri-Y40', 'Jl7vas15vQ']
  const paths = videoIds.map((videoId) => ({
    params: { videoId },
  }))

  return {
    paths,
    fallback: "blocking",
  }
}

export default function Video({
  video,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { userMetadata, isLoading } = useMagicUserMetadata({
    redirectTo: "/login",
  })
  const router = useRouter()

  const goBack = useCallback(() => router.back(), [router])

  if (!(isLoading || userMetadata)) return <Loader />

  if (!video) return null

  const { title, description, publishTime, channelTitle, viewCount } =
    video

  return (
    <div className={styles.container}>
      <Navbar />
      <Modal
        isOpen={true}
        contentLabel="Watch the video"
        onRequestClose={goBack}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <iframe
          id="ytplayer"
          className={styles.videoPlayer}
          width="100%"
          height="360"
          src={`https://www.youtube.com/embed/${router.query.videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
          frameBorder="0"
        />
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
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
      </Modal>
    </div>
  )
}
