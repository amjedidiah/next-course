import { useRouter } from "next/router";
import coffeeStoresData from "data/coffee-stores.json";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Link from "next/link";
import Head from "next/head";
import styles from "styles/coffee-store.module.scss";
import Image from "next/image";
import cls from "classnames";

const handleUpvoteButton = () => alert("Upvote");

export type CoffeeStoreType = {
  id: number;
  name: string;
  imgUrl: string;
  websiteUrl: string;
  address: string;
  neighbourhood: string;
};

export const getStaticProps: GetStaticProps<{
  coffeeStore?: CoffeeStoreType | null;
}> = ({ params }: GetStaticPropsContext) => {
  return {
    props: {
      coffeeStore:
        coffeeStoresData.find((store) => store.id.toString() === params?.cid) ??
        null,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: coffeeStoresData.map((store) => ({
      params: { cid: store.id.toString() },
    })),
    fallback: true,
  };
};

export default function CoffeeStore({
  coffeeStore,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;

  if (!coffeeStore) return <div>Not found</div>;

  const { name, imgUrl, address, neighbourhood } = coffeeStore;

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.columnLeft}>
          <div className={styles.backToHomeLink}>
            <Link href="/">Back to home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={imgUrl}
            alt={name}
            width={600}
            height={360}
            className={styles.storeImg}
          />
        </div>
        <div className={cls("glass", styles.columnRight)}>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/places.svg"
              width={24}
              height={24}
              alt="address-icon"
            />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/nearMe.svg"
              width={24}
              height={24}
              alt="address-icon"
            />
            <p className={styles.text}>{neighbourhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width={24}
              height={24}
              alt="address-icon"
            />
            <p className={styles.text}>1</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
