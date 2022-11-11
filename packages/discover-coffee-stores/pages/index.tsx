import Banner from "components/banner"
import CardList from "components/card-list"
import Image from "next/image"
import styles from "styles/home.module.scss"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { fetchCoffeeStores } from "lib/coffee-stores.lib"
import { CoffeeStoreType } from "utils/types/coffee-store.type"

const handleOnBannerClick = () => alert("me")

// Content here will only run on serverSide, and not on client side
export const getStaticProps: GetStaticProps<{
  coffeeStores: CoffeeStoreType[] | null
}> = async () => {
  const coffeeStores = await fetchCoffeeStores()

  return {
    props: { coffeeStores },
  }
}

export default function Home({
  coffeeStores,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Banner
          buttonText="View stores nearby"
          handleOnClick={handleOnBannerClick}
        />
        <div className={styles.heroImage}>
          <Image
            src="/static/hero-image.png"
            alt="hero"
            width={700}
            height={400}
            className={styles.heroImage}
          />
        </div>
        <CardList title="Toronto Stores" list={coffeeStores} />
      </main>
    </div>
  )
}
