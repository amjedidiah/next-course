import Banner from "components/banner/banner";
import Image from "next/image";
import styles from "styles/home.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Banner
          buttonText="View stores nearby"
          handleOnClick={() => alert("me")}
        />
        <Image
          src="/static/hero-image.png"
          alt="hero"
          width={700}
          height={400}
          className={styles.heroImage}
        />
      </main>
    </div>
  );
}