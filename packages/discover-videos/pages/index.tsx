import Head from "next/head"
import Banner from "components/banner"
import Navbar from "components/navbar"
import styles from "styles/home.module.scss"
import Section from "components/section"
import { getVideos, Video } from "lib/videos.lib"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import useMagicUserMetadata from "hooks/use-magic-user"
import Loader from "components/loader"

export const getServerSideProps: GetServerSideProps<{
  marvelVideos: Video[] | null
  travelVideos: Video[] | null
  productivityVideos: Video[] | null
  popularVideos: Video[] | null
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

  if (!(isLoading || userMetadata)) return <Loader />

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
