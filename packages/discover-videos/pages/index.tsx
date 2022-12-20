import Head from "next/head"
import Banner from "components/banner"
import Navbar from "components/navbar"
import styles from "styles/home.module.scss"
import Section from "components/section"
import getVideos, { Video } from "lib/videos"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"

export const getServerSideProps: GetServerSideProps<{
  disneyVideos: Video[] | null
  travelVideos: Video[] | null
  productivityVideos: Video[] | null
  popularVideos: Video[] | null
}> = async () => {
  const disneyVideos = await getVideos("disney trailer")
  const travelVideos = await getVideos("travel")
  const productivityVideos = await getVideos("productivity")
  const popularVideos = await getVideos()

  return {
    props: { disneyVideos, travelVideos, productivityVideos, popularVideos },
  }
}

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <Navbar username="jedi@jay.com" />
        <Banner
          title="Clifford the red dog"
          subTitle="a very cute dog"
          imgUrl="/static/clifford.webp"
        />

        <Section title="Disney" videos={props.disneyVideos} size="lg" />
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
