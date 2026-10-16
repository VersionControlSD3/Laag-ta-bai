import { useMemo, useState } from 'react'
import { Icon, LandmarkCard, LandmarkRow, SearchBar } from '../design-system/components'
import { MapPreview } from '../components/MapPreview'
import { LANDMARKS } from '../data/landmarks'
import { useCurrentLocation } from '../hooks/useCurrentLocation'
import { CEBU_CITY_CENTER, distanceKm, formatKm } from '../lib/geo'
import './ExplorePage.css'

const NEARBY_RADIUS_KM = 5
// Outside Metro Cebu a "nearby" list would be empty, so keep the city centre as the origin.
const CEBU_AREA_KM = 50

export function ExplorePage() {
  const [query, setQuery] = useState('')
  const { position, status, locate } = useCurrentLocation()

  const inCebu = position != null && distanceKm(position, CEBU_CITY_CENTER) <= CEBU_AREA_KM
  const origin = inCebu ? position : CEBU_CITY_CENTER

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    return LANDMARKS.filter((l) => !q || `${l.name} ${l.category} ${l.district}`.toLowerCase().includes(q))
      .map((l) => ({ ...l, km: distanceKm(origin, l) }))
      .sort((a, b) => a.km - b.km)
  }, [query, origin])

  const nearby = matches.filter((l) => l.km <= NEARBY_RADIUS_KM)
  const popular = [...matches].sort((a, b) => b.rating - a.rating).slice(0, 4)

  let locationNote = `Within a ${NEARBY_RADIUS_KM} km radius`
  if (status === 'denied') locationNote += ' of Cebu City · location off'
  else if (status === 'located' && !inCebu) locationNote += ' of Cebu City'

  return (
    <div className="explore">
      <header className="explore-header">
        <h1 className="explore-title">Explore</h1>
        <p className="explore-subtitle">Discover the heart of Cebu</p>
      </header>

      <div className="explore-gutter">
        <SearchBar id="explore-search" value={query} onChange={setQuery} trailingIcon="options-outline" />
      </div>

      <div className="explore-gutter">
        <MapPreview center={origin} showMarker={inCebu} locating={status === 'locating'} onLocate={locate} />
      </div>

      <section className="explore-section" aria-labelledby="nearby-title">
        <div className="explore-section-head explore-gutter">
          <div>
            <h2 id="nearby-title" className="explore-section-title">Nearby You</h2>
            <p className="explore-section-sub">{locationNote}</p>
          </div>
          <button type="button" className="explore-see-all" aria-label="See all nearby landmarks">
            <Icon name="arrow-forward" size={24} />
          </button>
        </div>
        {nearby.length > 0 ? (
          <div className="explore-rail">
            {nearby.map((l) => (
              <LandmarkCard key={l.id} title={l.name} meta={formatKm(l.km)} rating={l.rating.toFixed(1)} />
            ))}
          </div>
        ) : (
          <p className="explore-empty explore-gutter">No landmarks match “{query}” nearby.</p>
        )}
      </section>

      {popular.length > 0 && (
        <section className="explore-section explore-gutter" aria-labelledby="popular-title">
          <h2 id="popular-title" className="explore-section-title">Popular Landmarks</h2>
          <div className="explore-list">
            {popular.map((l) => (
              <LandmarkRow key={l.id} title={l.name} subtitle={`${l.district} · ${formatKm(l.km)}`} rating={l.rating.toFixed(1)} tag={l.category} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
