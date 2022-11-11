import { createApi } from "unsplash-js"
import {
  CoffeeStoresPhotos,
  CoffeeStoreType,
} from "utils/types/coffee-store.type"

const { FOURSQUARE_API_KEY, UNSPLASH_ACCESS_KEY } = process.env
const DEFAULT_COFFEE_STORE_IMAGE_URL =
  "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"

export async function fetchCoffeeStores(
  limit = 6 as number,
  lng = 6.457493278054195 as number,
  lat = 3.424143107781287 as number
): Promise<CoffeeStoreType[] | null> {
  let result = null

  try {
    const response = await fetch(
      `https://api.foursquare.com/v3/places/search?query=coffee&ll=${lng}%2C${lat}&limit=${limit}`,
      {
        headers: {
          Authorization: FOURSQUARE_API_KEY as string,
        },
      }
    )
    const data = await response.json()
    const images = await fetchCoffeeStoresPhotos()

    result = data.results.map((result: any, i: number) => {
      const neighborhood = result.location.neighborhood as string

      return {
        cid: result.fsq_id,
        address: result.location.address || "",
        neighborhood: neighborhood ? neighborhood[0] : "",
        name: result.name,
        imgUrl: images ? images[i] : DEFAULT_COFFEE_STORE_IMAGE_URL,
      } as CoffeeStoreType
    })
  } catch (err) {
    console.error(err)
  }

  return result
}

export async function fetchCoffeeStoresPhotos(): Promise<CoffeeStoresPhotos> {
  let result = null as CoffeeStoresPhotos

  try {
    const unsplash = createApi({
      accessKey: UNSPLASH_ACCESS_KEY as string,
    })

    const response = await unsplash.search.getPhotos({
      query: "coffee shop",
      page: 1,
      perPage: 30,
    })

    const data = await response.response

    if (!data) return undefined

    result = data.results.map((result) => result.urls.raw)
  } catch (err) {
    console.error(err)
  }

  return result
}
