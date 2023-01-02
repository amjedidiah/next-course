import Image from "next/image"
import Link from "next/link"
import styles from "styles/banner.module.scss"

type BannerProps = {
  title: string
  subTitle: string
  imgUrl: string
  videoId: string
}

export default function Banner({
  title,
  subTitle,
  imgUrl,
  videoId,
}: BannerProps) {
  return (
    <div className={styles.container}>
      <div className={styles["left-wrapper"]}>
        <div className={styles.left}>
          <div className={styles["series-wrapper"]}>
            <p className={styles["first-letter"]}>N</p>
            <p className={styles.series}>S E R I E S</p>
          </div>
          <h3 className={styles.title}>{title}</h3>
          <h4 className={styles["sub-title"]}>{subTitle}</h4>
          <div className={styles["play-button-wrapper"]}>
            <Link href={`/?video=${videoId}`} as={`/${videoId}`}>
              <button className={styles["play-button"]}>
                <Image
                  src="/static/play_arrow.svg"
                  alt="play icon"
                  width={32}
                  height={32}
                />
                <span className={styles["play-text"]}>Play</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div
        style={{ backgroundImage: `url(${imgUrl})` }}
        className={styles["banner-cover"]}
      />
    </div>
  )
}
