import { StoreContext } from "context/store.context"
import { useContext, useState } from "react"

type Position = {
  coords: {
    latitude: number
    longitude: number
  }
}

export default function useTrackLocation(): {
  errorMessage: string
  loading: boolean
  handleTrackLocation: () => void
} {
  const { setLatLng } = useContext(StoreContext)
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const success = ({ coords: { latitude, longitude } }: Position) => {
    setLatLng(`${latitude},${longitude}`)
    setErrorMessage("")
    setLoading(false)
  }

  const error = () => {
    setLatLng("")
    setErrorMessage("Unable to retrieve your location")
    setLoading(false)
  }

  const handleTrackLocation = () => {
    setLoading(true)

    if (!navigator.geolocation) {
      setErrorMessage("Geolocation is not supported by your browser")
      setLoading(false)
    } else {
      navigator.geolocation.getCurrentPosition(success, error)
    }
  }

  return { errorMessage, loading, handleTrackLocation }
}
