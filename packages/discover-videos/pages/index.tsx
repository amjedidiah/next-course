import Head from "next/head"
import Banner from "components/banner"
import Navbar from "components/navbar"
import styles from "styles/home.module.scss"
import Card from "components/card"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar username="jedi@jay.com" />
      <Banner
        title="Clifford the red dog"
        subTitle="a very cute dog"
        imgUrl="/static/clifford.webp"
      />

      <Card imgUrl="/static/clifford.webp" size="lg" />
    </div>
  )
}
