import { useCallback, useState } from 'react'
import type { LatLng } from '../lib/geo'

export type LocationStatus = 'idle' | 'locating' | 'located' | 'denied' | 'unavailable'

/**
 * The traveller's GPS position, requested only when they ask for it
 * (tapping recenter) so the permission prompt always has context.
 */
export function useCurrentLocation() {
  const [position, setPosition] = useState<LatLng | null>(null)
  const [status, setStatus] = useState<LocationStatus>('idle')

  const locate = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setStatus('unavailable')
      return
    }
    setStatus('locating')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setStatus('located')
      },
      (err) => setStatus(err.code === err.PERMISSION_DENIED ? 'denied' : 'unavailable'),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    )
  }, [])

  return { position, status, locate }
}
