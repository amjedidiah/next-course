export interface CoffeeStoreType {
  cid: string
  address?: string
  neighborhood?: string
  name: string
  imgUrl: string
  upvotes?: number
}

export interface CoffeeStoreTypeResponse extends CoffeeStoreType {
  fsq_id: string
  location: {
    address?: string
    neighborhood?: string
  }
}

export type CoffeeStoresPhotos = string[] | null
