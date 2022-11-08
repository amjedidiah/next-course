import Banner from "components/banner/banner";
import styles from "styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Banner buttonText="View stores nearby" handleOnClick={() => alert("me")} />
      </main>
    </div>
  );
}
