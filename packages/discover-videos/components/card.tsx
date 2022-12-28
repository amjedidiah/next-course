import Image from "next/image"
import styles from "styles/card.module.scss"
import cls from "classnames"
import { SyntheticEvent, useCallback, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Video } from "lib/videos.lib"

interface CardProps extends Video {
  size?: "sm" | "md" | "lg"
  count: number
}

const placeholder =
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80"

export default function Card({ imgUrl, size = "md", count, title }: CardProps) {
  const [stateImgUrl, setStateImgUrl] = useState(imgUrl)

  const handleError = useCallback(
    (e: SyntheticEvent<HTMLImageElement, Event>) => {
      setStateImgUrl(placeholder)
    },
    []
  )

  const scale = useMemo(
    () => (count === 0 ? { scaleY: 1.1 } : { scale: 1.1 }),
    [count]
  )

  return (
    <div className={styles.card}>
      <motion.div
        className={cls(styles[size], styles["img-holder"])}
        whileHover={{ ...scale, zIndex: 99 }}
      >
        <Image
          src={stateImgUrl}
          alt={title}
          className={styles["card-img"]}
          sizes="100%"
          onError={handleError}
          fill
        />
      </motion.div>
    </div>
  )
}
