import Image from "next/image";
import Link from "next/link";
import styles from "styles/card.module.scss";
import classnames from "classnames";

export type CardProps = {
  id: number;
  name: string;
  imgUrl: string;
};

export default function Card({ id, name, imgUrl }: CardProps) {
  return (
    <div className={styles.card}>
      <Link href={`/coffee-store/${id}`} className={styles.cardLink}>
        <div className={classnames(styles.container, "glass")}>
          <div className={styles.cardHeaderWrapper}>
            <h2 className={styles.cardHeader}>{name}</h2>
          </div>
          <div className={styles.cardImageWrapper}>
            <Image
              src={imgUrl}
              width={260}
              height={160}
              alt={name}
              className={styles.cardImage}
            />
          </div>
        </div>
      </Link>
    </div>
  );
}