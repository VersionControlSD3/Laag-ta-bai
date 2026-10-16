import { IconButton } from '../design-system/components'
import type { LatLng } from '../lib/geo'

interface MapPreviewProps {
  center: LatLng
  showMarker: boolean
  locating: boolean
  onLocate: () => void
  onExpand?: () => void
}

// Roughly 1 km either side of the centre at Cebu's latitude.
const SPAN = 0.009

/**
 * The Explore map card. A keyless OpenStreetMap embed stands in for the
 * Google Maps view (SRS 3.1.4.2) until a Maps Platform key is configured.
 */
export function MapPreview({ center, showMarker, locating, onLocate, onExpand }: MapPreviewProps) {
  const bbox = [center.lng - SPAN, center.lat - SPAN * 0.6, center.lng + SPAN, center.lat + SPAN * 0.6].map((n) => n.toFixed(5)).join(',')
  const marker = showMarker ? `&marker=${center.lat.toFixed(5)},${center.lng.toFixed(5)}` : ''
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik${marker}`

  return (
    <div className="explore-map">
      <iframe key={src} className="explore-map-frame" title="Map of landmarks near you" src={src} loading="lazy" />
      <IconButton className="explore-map-expand" icon="expand" label="Open full map" variant="terracotta" onClick={onExpand} />
      <IconButton
        className="explore-map-locate"
        icon="locate"
        label={locating ? 'Finding your location' : 'Recenter on my location'}
        variant="surface"
        shape="square"
        size={40}
        onClick={onLocate}
      />
    </div>
  )
}
