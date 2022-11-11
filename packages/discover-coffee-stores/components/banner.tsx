import styles from "styles/banner.module.scss"

type BannerProps = {
  buttonText: string
  handleOnClick: (event: React.MouseEvent<HTMLElement>) => void
}

export default function Banner({ buttonText, handleOnClick }: BannerProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Coffee</span>
        <span className={styles.title2}>Connoisseur</span>
      </h1>
      <p className={styles.subTitle}>Discover your local coffee shops!</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={handleOnClick}>
          {buttonText}
        </button>
      </div>
    </div>
  )
}
