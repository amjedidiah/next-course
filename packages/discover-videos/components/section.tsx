import styles from "styles/section.module.scss"
import Card from "components/card"
import { Video } from "lib/videos.lib"
import Link from "next/link"

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
            <Link
              href={`/?video=${video.id}`}
              as={`/${video.id}`}
              key={video.id}
            >
              <Card count={idx} size={size} {...video} />
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
