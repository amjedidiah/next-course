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

export type CoffeeStore = {
  id: number;
  name: string;
  imgUrl: string;
  websiteUrl: string;
  address: string;
  neighbourhood: string;
};

export const getStaticProps: GetStaticProps<{
  coffeeStore?: CoffeeStore | null;
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

export default function CoffeeStoreSingle({
  coffeeStore,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;

  if (!coffeeStore) return <div>Not found</div>;

  return (
    <>
      <Head>
        <title>{coffeeStore.name}</title>
      </Head>
      <Link href="/">Back to home</Link>
      <p>Address: {coffeeStore.address}</p>
      <p>Name: {coffeeStore.name}</p>
      <p>Neighbourhood: {coffeeStore.neighbourhood}</p>
    </>
  );
}
