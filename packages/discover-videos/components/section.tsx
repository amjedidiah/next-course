import styles from "styles/section.module.scss"
import Card from "components/card"
import { Video } from "lib/videos.lib"

type SectionProps = {
  title: string
  videos?: Video[]
  size?: "sm" | "md" | "lg"
}

export default function Section({ title, videos, size }: SectionProps) {
  if (!videos) return null

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>
        {videos.map((video, idx) => 
            <Card key={video.id} count={idx} size={size} {...video} />
        )}
      </div>
    </section>
  )
}
