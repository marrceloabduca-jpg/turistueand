export interface Package {
  id: string
  name: string
  slug: string
  description: string
  short_description: string | null
  destination: string
  category: string
  duration: string
  group_size: string | null
  price: number | null
  original_price: number | null
  admin_fee: number | null
  image_url: string | null
  gallery: string[]
  includes: string[]
  highlights: string[]
  itinerary: ItineraryDay[]
  is_featured: boolean
  is_active: boolean
  departure_dates: string[]
  created_at: string
  updated_at: string
}

export interface ItineraryDay {
  day: number
  title: string
  description: string
}

export interface Inquiry {
  id: string
  name: string
  email: string | null
  phone: string | null
  package_id: string | null
  message: string | null
  status: 'pending' | 'contacted' | 'converted' | 'closed'
  created_at: string
  package?: Package
}

export type PackageCategory = 'aventura' | 'naturaleza' | 'cultural' | 'gastronomico' | 'relax' | 'playa' | 'nieve'

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  created_at: string
}

export interface Destination {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  region: string | null
  is_featured: boolean
  created_at: string
}

export const FALLBACK_CATEGORIES: { value: PackageCategory; label: string }[] = [
  { value: 'aventura', label: 'Aventura' },
  { value: 'naturaleza', label: 'Naturaleza' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'gastronomico', label: 'Gastronomía' },
  { value: 'relax', label: 'Relax' },
]

/** Valid database columns for the packages table, used to sanitize API payloads */
export const PACKAGE_DB_COLUMNS = [
  "name", "slug", "description", "short_description",
  "destination", "category", "duration", "group_size",
  "price", "original_price", "admin_fee",
  "image_url", "gallery",
  "includes", "highlights", "itinerary",
  "is_featured", "is_active", "departure_dates",
] as const

export const FALLBACK_DESTINATIONS = [
  'Bariloche',
  'Iguazú',
  'Mendoza',
  'Salta',
  'Ushuaia',
  'Buenos Aires',
  'Córdoba',
  'El Calafate',
  'Puerto Madryn',
  'Tucumán',
]
