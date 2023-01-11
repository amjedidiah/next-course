import { useCallback } from "react"
import styles from "styles/icons.module.scss"
import Dislike from "./dislike-icon"
import Like from "./like-icon"

type IconProps = {
  liked?: Boolean
  onSetLiked: (liked: Boolean) => void
}

export type IconSvgProps = {
  selected?: Boolean
}

export default function Icons({ liked, onSetLiked }: IconProps) {
  const toggleLike = useCallback(() => onSetLiked(true), [onSetLiked])
  const toggleUnlike = useCallback(() => onSetLiked(false), [onSetLiked])

  return (
    <div className={styles.likeDislikeBtnWrapper}>
      <div className={styles.likeBtnWrapper}>
        <button onClick={toggleLike}>
          <div className={styles.btnWrapper}>
            <Like selected={liked} />
          </div>
        </button>
      </div>
      <button onClick={toggleUnlike}>
        <div className={styles.btnWrapper}>
          <Dislike selected={liked === false} />
        </div>
      </button>
    </div>
  )
}
