import Image from "next/image";
import Link from "next/link";
import styles from "styles/card.module.scss";
import cls from "classnames";
import { defaultCoffeeStoreImgUrl } from "pages/coffee-store/[cid]";
import { CoffeeStoreType } from "utils/types/coffee-store.type";

export default function Card({ fsq_id, name, imgUrl }: CoffeeStoreType) {
  return (
    <div className={styles.card}>
      <Link href={`/coffee-store/${fsq_id}`} className={styles.cardLink}>
        <div className={cls(styles.container, "glass")}>
          <div className={styles.cardHeaderWrapper}>
            <h2 className={styles.cardHeader}>{name}</h2>
          </div>
          <div className={styles.cardImageWrapper}>
            <Image
              src={imgUrl ?? defaultCoffeeStoreImgUrl}
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