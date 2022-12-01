import Banner from "components/banner"
import CardList from "components/card-list"
import Image from "next/image"
import styles from "styles/home.module.scss"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { fetchCoffeeStores } from "lib/coffee-stores.lib"
import { CoffeeStoreType } from "utils/types/coffee-store.type"
import { useCallback, useContext, useMemo } from "react"
import useTrackLocation from "hooks/use-track-location"
import { StoreContext } from "context/store.context"

// Content here will only run on serverSide, and not on client side
export const getStaticProps: GetStaticProps<{
  coffeeStores: CoffeeStoreType[] | null
}> = async () => {
  const coffeeStores = await fetchCoffeeStores()

  return {
    props: { coffeeStores },
  }
}

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { coffeeStores, isFetchingStores } = useContext(StoreContext)
  const { errorMessage, loading, handleTrackLocation } = useTrackLocation()
  const buttonText = useMemo(() => {
    if (loading) return "Locating..."
    if (isFetchingStores) return "Fetching..."

    return "View stores nearby"
  }, [isFetchingStores, loading])

  const handleOnBannerClick = useCallback(() => {
    handleTrackLocation()
  }, [handleTrackLocation])

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Banner buttonText={buttonText} handleOnClick={handleOnBannerClick} />
        <div className={styles.heroImage}>
          <Image
            src="/static/hero-image.png"
            alt="hero"
            width={700}
            height={400}
            className={styles.heroImage}
          />
        </div>
        {errorMessage && <p>Sorry an error occurred: {errorMessage}</p>}
        {coffeeStores && (
          <CardList title="Coffee Stores Near Me" list={coffeeStores} />
        )}
        <CardList
          title="Victoria Island Coffee Stores"
          list={props.coffeeStores}
        />
      </main>
    </div>
  )
}
