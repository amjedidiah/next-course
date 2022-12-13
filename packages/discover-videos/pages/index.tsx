import Head from "next/head";
import Banner from "components/banner";
import Navbar from "components/navbar";
import styles from "styles/home.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Netflix</h1>

      <Navbar username="jedi@jay.com" />
      <Banner
        title="Clifford the red dog"
        subTitle="a very cute dog"
        imgUrl="/static/clifford.webp"
      />
    </div>
  );
}
