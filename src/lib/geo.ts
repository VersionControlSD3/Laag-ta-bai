export interface LatLng {
  lat: number
  lng: number
}

/** Colon Street, downtown Cebu City, used until the traveller shares their location. */
export const CEBU_CITY_CENTER: LatLng = { lat: 10.2975, lng: 123.9005 }

const EARTH_RADIUS_KM = 6371

/** Great-circle (haversine) distance between two points, in kilometres. */
export function distanceKm(a: LatLng, b: LatLng): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h))
}

/** Distances to one decimal with a space, per the content guidelines ("0.4 km"). */
export function formatKm(km: number): string {
  return `${km.toFixed(1)} km`
}
