import { fetchCoffeeStores } from "lib/coffee-stores.lib"
import { createContext, useEffect, useState } from "react"
import { CoffeeStoreType } from "utils/types/coffee-store.type"

type StoreContextType = {
  setLatLng: (latLng: string) => void
  coffeeStores: CoffeeStoreType[] | null
  isFetchingStores: boolean
}

export const StoreContext = createContext<StoreContextType>({
  setLatLng: () => {},
  coffeeStores: null,
  isFetchingStores: false,
})

export const StoreProvider = ({ children }: { children: JSX.Element }) => {
  const [latLng, setLatLng] = useState("")
  const [coffeeStores, setCoffeeStores] = useState<CoffeeStoreType[] | null>(
    null
  )
  const [isFetchingStores, setIsFetchingStores] = useState(false)

  useEffect(() => {
    if (latLng) {
      setIsFetchingStores(true)
      fetchCoffeeStores(latLng)
        .then(setCoffeeStores)
        .catch((err) => console.error(err))
        .finally(() => setIsFetchingStores(false))
    }
  }, [latLng])

  return (
    <StoreContext.Provider
      value={{
        setLatLng,
        coffeeStores,
        isFetchingStores,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
