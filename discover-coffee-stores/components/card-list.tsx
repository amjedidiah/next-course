import Card, { CoffeeStore } from "components/card";
import styles from "styles/card-list.module.scss";

type CardListProps = {
  list: Array<CoffeeStore>;
  title: string;
};

export default function CardList({ list, title }: CardListProps) {
  if (!list.length) return null;

  return (
    <>
      <h2 className={styles.heading2}>{title}</h2>
      <div className={styles.cardList}>
        {list.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>
    </>
  );
}