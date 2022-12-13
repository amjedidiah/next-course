import Image from "next/image";
import { useCallback } from "react";
import styles from "../styles/banner.module.scss";

type BannerProps = {
  title: string;
  subTitle: string;
  imgUrl: string;
};

export default function Banner({ title, subTitle, imgUrl }: BannerProps) {
  const handleOnPlay = useCallback(() => {
    console.log("play");
  }, []);

  return (
    <div className={styles["container"]}>
      <div className={styles["left-wrapper"]}>
        <div className={styles["left"]}>
          <div className={styles["series-wrapper"]}>
            <p className={styles["first-letter"]}>N</p>
            <p className={styles.series}>S E R I E S</p>
          </div>
          <h3>{title}</h3>
          <h3>{subTitle}</h3>
          <div className={styles["play-button-wrapper"]}>
            <button className={styles["play-button"]} onClick={handleOnPlay}>
              <Image src="/static/play_arrow.svg" alt="play-icon" width={32} height={32} />
              <span className={styles["play-text"]}>Play</span>
            </button>
          </div>
        </div>
        <div
          style={{ backgroundImage: `url(${imgUrl})` }}
          className={styles["banner-cover"]}
        />
      </div>
    </div>
  );
}
