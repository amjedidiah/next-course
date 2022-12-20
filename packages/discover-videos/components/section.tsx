import styles from "styles/section.module.scss"
import Card from "components/card"
import { Video } from "lib/videos"

type SectionProps = {
  title: string
  videos: Video[] | null
  size?: "sm" | "md" | "lg"
}

export default function Section({ title, videos, size }: SectionProps) {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      {videos && (
        <div className={styles.content}>
          {videos.map((video, idx) => (
            <Card key={idx} count={idx} size={size} {...video} />
          ))}
        </div>
      )}
    </section>
  )
}
