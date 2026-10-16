// Seed list of Cebu heritage landmarks shown on Explore until the landmark database is wired up.
// Ratings are placeholders, not real visitor reviews.

export type LandmarkCategory = 'Church' | 'Fort' | 'Monument' | 'Museum'

export interface Landmark {
  id: string
  name: string
  category: LandmarkCategory
  district: string
  lat: number
  lng: number
  rating: number
  free: boolean
}

export const LANDMARKS: Landmark[] = [
  { id: 'yap-sandiego', name: 'Yap-Sandiego House', category: 'Museum', district: 'Parian, Cebu City', lat: 10.29583, lng: 123.90243, rating: 4.6, free: false },
  { id: 'heritage-monument', name: 'Heritage of Cebu Monument', category: 'Monument', district: 'Parian, Cebu City', lat: 10.29654, lng: 123.90373, rating: 4.5, free: true },
  { id: 'casa-gorordo', name: 'Casa Gorordo', category: 'Museum', district: 'Parian, Cebu City', lat: 10.29587, lng: 123.90406, rating: 4.7, free: false },
  { id: 'magellans-cross', name: "Magellan's Cross", category: 'Monument', district: 'Downtown, Cebu City', lat: 10.29343, lng: 123.90208, rating: 4.6, free: true },
  { id: 'santo-nino', name: 'Basilica del Santo Niño', category: 'Church', district: 'Downtown, Cebu City', lat: 10.29456, lng: 123.90192, rating: 4.8, free: true },
  { id: 'fort-san-pedro', name: 'Fort San Pedro', category: 'Fort', district: 'Plaza Independencia, Cebu City', lat: 10.29247, lng: 123.90584, rating: 4.5, free: false },
  { id: 'museo-sugbo', name: 'Museo Sugbo', category: 'Museum', district: 'Cebu City', lat: 10.30083, lng: 123.90681, rating: 4.4, free: false },
  { id: 'temple-of-leah', name: 'Temple of Leah', category: 'Monument', district: 'Busay, Cebu City', lat: 10.37128, lng: 123.87073, rating: 4.5, free: false },
]
