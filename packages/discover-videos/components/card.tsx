import Image from "next/image"
import styles from "styles/card.module.scss"
import cls from "classnames"
import { SyntheticEvent, useCallback, useState } from "react"

type CardProps = {
  imgUrl: string
  size?: "sm" | "md" | "lg"
}

const placeholder =
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80"

export default function Card({ imgUrl, size = "md" }: CardProps) {
  const [stateImgUrl, setStateImgUrl] = useState(imgUrl)

  const handleError = useCallback(
    (e: SyntheticEvent<HTMLImageElement, Event>) => {
      setStateImgUrl(placeholder)
    },
    []
  )

  return (
    <div className={styles.card}>
      Card
      <div className={cls(styles[size], styles["img-holder"])}>
        <Image
          src={stateImgUrl}
          alt="card"
          className={styles["card-img"]}
          sizes="100%"
          onError={handleError}
          fill
        />
      </div>
    </div>
  )
}
