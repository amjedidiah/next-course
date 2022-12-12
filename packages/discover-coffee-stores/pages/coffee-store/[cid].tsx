import { useRouter } from "next/router"
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next"
import Link from "next/link"
import Head from "next/head"
import styles from "styles/coffee-store.module.scss"
import Image from "next/image"
import cls from "classnames"
import { CoffeeStoreType } from "utils/types/coffee-store.type"
import {
  fetchCoffeeStore,
  fetchCoffeeStores,
  saveStore,
} from "lib/coffee-stores.lib"
import { useContext, useEffect, useState } from "react"
import { StoreContext } from "context/store.context"

const handleUpvoteButton = () => alert("Upvote")

export const getStaticProps: GetStaticProps<{
  coffeeStore: CoffeeStoreType | null
}> = async ({ params }: GetStaticPropsContext) => {
  const coffeeStores = await fetchCoffeeStores()
  const coffeeStore = coffeeStores
    ? coffeeStores.find((store) => store.cid.toString() === params?.cid) || null
    : null

  return { props: { coffeeStore } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const coffeeStores = await fetchCoffeeStores()

  return {
    paths: coffeeStores
      ? coffeeStores.map((store) => ({
          params: { cid: store.cid.toString() },
        }))
      : [],
    fallback: true,
  }
}

export default function CoffeeStore(
  initialProps: InferGetStaticPropsType<typeof getStaticProps>
) {
  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore)
  const {
    isFallback,
    query: { cid },
  } = useRouter()
  const { coffeeStores } = useContext(StoreContext)

  useEffect(() => {
    const initStore = async () => {
      let dynamicCoffeeStore
      if (coffeeStores) {
        dynamicCoffeeStore = coffeeStores.find((store) => store.cid === cid)
        saveStore(dynamicCoffeeStore as CoffeeStoreType)
      } else {
        dynamicCoffeeStore = await fetchCoffeeStore(cid as string)
      }

      if (dynamicCoffeeStore) setCoffeeStore(dynamicCoffeeStore)
    }

    if (!coffeeStore) initStore()
  }, [cid, coffeeStores, coffeeStore])

  if (isFallback) return <div>Loading...</div>

  if (!coffeeStore) return <div>Not found</div>

  const { name, imgUrl, address, neighborhood } = coffeeStore

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
          {address && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/places.svg"
                width={24}
                height={24}
                alt="location-icon"
              />
              <p className={styles.text}>{address}</p>
            </div>
          )}
          {neighborhood && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/nearMe.svg"
                width={24}
                height={24}
                alt="location-icon"
              />
              <p className={styles.text}>{neighborhood}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width={24}
              height={24}
              alt="location-icon"
            />
            <p className={styles.text}>1</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  )
}
