import Head from "next/head";
import { useRouter } from "next/router";

export default function NotFound() {
  const {
    query: { page },
  } = useRouter();

  return (
    <>
      <Head>
        <title>Not Found | Coffee Connoisseur</title>
      </Head>
      <p>Page {page} not found</p>
    </>
  );
}