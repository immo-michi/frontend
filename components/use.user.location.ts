import { useEffect, useState } from 'react'

export const useUserLocation = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number }>()

  useEffect(() => {
    if (!process.browser) {
      return
    }

    if (!navigator.geolocation) {
      return
    }

    const watchId = navigator.geolocation.watchPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    })

    return () => navigator.geolocation.clearWatch(watchId)
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return location
}
