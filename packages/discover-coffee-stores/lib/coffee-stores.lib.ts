import { createApi } from "unsplash-js"
import {
  CoffeeStoresPhotos,
  CoffeeStoreType,
  CoffeeStoreTypeResponse,
} from "utils/types/coffee-store.type"

const DEFAULT_COFFEE_STORE_IMAGE_URL =
  "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"

export async function fetchCoffeeStores(
  latLng = "6.457493278054195,3.424143107781287",
  limit = 6
): Promise<CoffeeStoreType[] | null> {
  let result = null as CoffeeStoreType[] | null

  handler: try {
    const data = await fetch(
      `https://api.foursquare.com/v3/places/search?query=coffee&ll=${latLng}&limit=${limit}`,
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY as string,
        },
      }
    ).then((res) => res.json())
    const images = await fetchCoffeeStoresPhotos()

    if (!data.results) break handler

    result = data.results.map((result: CoffeeStoreTypeResponse, i: number) => {
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

  handler: try {
    const unsplash = createApi({
      accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY as string,
    })

    const response = await unsplash.search.getPhotos({
      query: "coffee shop",
      page: 1,
      perPage: 30,
    })

    const data = await response.response

    if (!data) break handler

    result = data.results.map((result) => result.urls.raw)
  } catch (err) {
    console.error(err)
  }

  return result
}

export const fetchCoffeeStore = async (
  id: string
): Promise<CoffeeStoreType | null> =>
  fetch(`/api/get-store/${id}`)
    .then((res) => res.json())
    .then(({ data }) => data)
    .catch((err) => {
      console.error(err)
      return null
    })

export const saveCoffeeStore = async (
  store: CoffeeStoreType
): Promise<CoffeeStoreType | null> =>
  fetch("/api/save-store", {
    method: "POST",
    body: JSON.stringify(store),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(({ data }) => data)
    .catch((err) => {
      console.error(err)
      return null
    })

export const upvoteStore = async (
  id: string
): Promise<CoffeeStoreType | null> =>
  fetch(`/api/upvote-store/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(({ data }) => data)
    .catch((err) => {
      console.error(err)
      return null
    })
