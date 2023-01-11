import Head from "next/head"
import Banner from "components/banner"
import Navbar from "components/navbar"
import styles from "styles/home.module.scss"
import Section from "components/section"
import { getBannerVideo, getVideos, Video as VideoType } from "lib/videos.lib"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import ReactModal from "react-modal"
import Video from "components/video"
import { useRouter } from "next/router"
import modalStyles from "styles/modal.module.scss"
import { useCallback } from "react"

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
ReactModal.setAppElement("#__next")

export const getServerSideProps: GetServerSideProps<{
  marvelVideos?: VideoType[]
  travelVideos?: VideoType[]
  productivityVideos?: VideoType[]
  popularVideos?: VideoType[]
  bannerVideo?: VideoType
}> = async () => {
  const marvelVideos = await getVideos("marvel trailer")
  const travelVideos = await getVideos("travel")
  const productivityVideos = await getVideos("productivity")
  const popularVideos = await getVideos()
  const bannerVideo = await getBannerVideo()

  return {
    props: {
      marvelVideos,
      travelVideos,
      productivityVideos,
      popularVideos,
      bannerVideo,
    },
  }
}

export default function Home({
  marvelVideos,
  travelVideos,
  productivityVideos,
  popularVideos,
  bannerVideo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const fallbackId = router.query.video as string
  const goBack = useCallback(() => router.back(), [router])
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ReactModal
        isOpen={Boolean(fallbackId)}
        contentLabel="Watch the video"
        onRequestClose={goBack}
        className={modalStyles.modal}
        overlayClassName={modalStyles.overlay}
      >
        <Video fallbackId={fallbackId} />
      </ReactModal>

      <div className={styles.main}>
        <Navbar />
        <Banner video={bannerVideo} />

        <Section title="Marvel" videos={marvelVideos} size="lg" />
        <Section title="Travel" videos={travelVideos} size="md" />
        <Section title="Popular" videos={popularVideos} size="sm" />
        <Section title="Productivity" videos={productivityVideos} size="sm" />
      </div>
    </div>
  )
}
