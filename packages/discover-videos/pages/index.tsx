import Head from "next/head"
import Banner from "components/banner"
import Navbar from "components/navbar"
import styles from "styles/home.module.scss"
import Section from "components/section"
import { getVideos, Video as VideoType } from "lib/videos.lib"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import useMagicUserMetadata from "hooks/use-magic-user"
import Loader from "components/loader"
import ReactModal from "react-modal"
import { useRouteChange } from "hooks/use-route-change"
import Video from "components/video"
import { useRouter } from "next/router"
import modalStyles from "styles/modal.module.scss"

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
ReactModal.setAppElement("#__next")

export const getServerSideProps: GetServerSideProps<{
  marvelVideos: VideoType[] | null
  travelVideos: VideoType[] | null
  productivityVideos: VideoType[] | null
  popularVideos: VideoType[] | null
}> = async () => {
  const marvelVideos = await getVideos("marvel trailer")
  const travelVideos = await getVideos("travel")
  const productivityVideos = await getVideos("productivity")
  const popularVideos = await getVideos()

  return {
    props: { marvelVideos, travelVideos, productivityVideos, popularVideos },
  }
}

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { userMetadata, isLoading } = useMagicUserMetadata({
    redirectTo: "/login",
  })
  const fallbackId = useRouter().query.video as string
  const { goBack } = useRouteChange()

  if (!(isLoading || userMetadata)) return <Loader />

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
        <Banner
          title="Clifford the red dog"
          subTitle="a very cute dog"
          imgUrl="/static/clifford.webp"
          videoId="iBMPbrja1tM"
        />

        <Section title="Marvel" videos={props.marvelVideos} size="lg" />
        <Section title="Travel" videos={props.travelVideos} size="md" />
        <Section title="Popular" videos={props.popularVideos} size="sm" />
        <Section
          title="Productivity"
          videos={props.productivityVideos}
          size="sm"
        />
      </div>
    </div>
  )
}
