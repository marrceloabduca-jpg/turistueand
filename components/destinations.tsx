"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { MapPin, ArrowRight, Sun } from "lucide-react"
import type { Destination } from "@/lib/types"

interface DestinationsProps {
  destinations: Destination[]
}


// Fallback destinations for when DB is empty
const fallbackDestinations: Destination[] = [
  {
    id: "1",
    name: "Cataratas del Iguazú",
    slug: "iguazu",
    region: "Misiones",
    description: "Una de las 7 maravillas naturales",
    image_url: "/images/iguazu.jpg",
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Salta",
    slug: "salta",
    region: "Norte Argentino",
    description: "Colores y cultura del NOA",
    image_url: "/images/salta.jpg",
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Federación",
    slug: "federacion",
    region: "Entre Ríos",
    description: "Termas y naturaleza en el litoral",
    image_url: "https://media-cdn.tripadvisor.com/media/photo-c/1280x250/09/24/fd/0e/termas-de-federacion.jpg",
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Carlos Paz",
    slug: "carlos-paz",
    region: "Córdoba",
    description: "El lago y las sierras cordobesas",
    image_url: "data:image/jpeg;base64,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",
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Merlo",
    slug: "merlo",
    region: "San Luis",
    description: "El microclima especial de las sierras",
    image_url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1024&q=80",
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    name: "San Rafael",
    slug: "san-rafael",
    region: "Mendoza",
    description: "Viñedos y aventura al pie de los Andes",
    image_url: "data:image/jpeg;base64,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",
    is_featured: false,
    created_at: new Date().toISOString(),
  },
]

export function Destinations({ destinations: dbDestinations }: DestinationsProps) {
  // Use DB destinations or fallback
  const destinations = dbDestinations.length > 0 ? dbDestinations : fallbackDestinations

  // Ensure we have at least 6 destinations for the grid
  const displayDestinations = destinations.slice(0, 6)

  // Fill remaining slots with placeholder if needed
  while (displayDestinations.length < 6) {
    displayDestinations.push(fallbackDestinations[displayDestinations.length] || fallbackDestinations[0])
  }

  return (
    <section id="destinos" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 border-secondary/30 text-secondary">
            Destinos
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Explorá <span className="text-secondary">Argentina</span> con nosotros
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Desde las majestuosas Cataratas del Iguazú hasta las sierras de Córdoba y los Andes mendocinos,
            cada destino tiene algo especial para vos.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {/* First destination - Large */}
          <div className="col-span-2 row-span-2 group relative rounded-3xl overflow-hidden h-[400px] md:h-[500px]">
            <Image
              src={displayDestinations[0].image_url || "/placeholder.svg?height=500&width=600"}
              alt={displayDestinations[0].name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            {displayDestinations[0].is_featured && (
              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground border-0">
                Popular
              </Badge>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 text-background/80 text-sm mb-2">
                <MapPin className="h-4 w-4" />
                {displayDestinations[0].region}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-background mb-3">
                {displayDestinations[0].name}
              </h3>
              <button 
                onClick={() => document.getElementById("paquetes")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 text-primary font-medium group/btn"
              >
                Ver paquetes
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Second destination - Wide */}
          <div className="col-span-2 group relative rounded-3xl overflow-hidden h-[200px] md:h-[240px]">
            <Image
              src={displayDestinations[1].image_url || "/placeholder.svg?height=240&width=400"}
              alt={displayDestinations[1].name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            {displayDestinations[1].is_featured && (
              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground border-0">
                Imperdible
              </Badge>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <div className="flex items-center gap-2 text-background/80 text-xs mb-1">
                <MapPin className="h-3 w-3" />
                {displayDestinations[1].region}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-background">
                {displayDestinations[1].name}
              </h3>
            </div>
          </div>

          {/* Third destination - Small */}
          <div className="col-span-1 group relative rounded-3xl overflow-hidden h-[200px] md:h-[240px]">
            <Image
              src={displayDestinations[2].image_url || "/placeholder.svg?height=240&width=300"}
              alt={displayDestinations[2].name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center gap-1 text-background/80 text-xs mb-1">
                <MapPin className="h-3 w-3" />
                {displayDestinations[2].region}
              </div>
              <h3 className="text-base md:text-lg font-bold text-background">
                {displayDestinations[2].name}
              </h3>
            </div>
          </div>

          {/* Fourth destination - Small */}
          <div className="col-span-1 group relative rounded-3xl overflow-hidden h-[200px] md:h-[240px]">
            <Image
              src={displayDestinations[4].image_url || "/placeholder.svg?height=240&width=300"}
              alt={displayDestinations[4].name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center gap-1 text-background/80 text-xs mb-1">
                <MapPin className="h-3 w-3" />
                {displayDestinations[4].region}
              </div>
              <h3 className="text-base md:text-lg font-bold text-background">
                {displayDestinations[4].name}
              </h3>
            </div>
          </div>

          {/* Fifth destination - Wide */}
          <div className="col-span-2 group relative rounded-3xl overflow-hidden h-[200px] md:h-[240px]">
            <Image
              src={displayDestinations[3].image_url || "/placeholder.svg?height=240&width=400"}
              alt={displayDestinations[3].name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            {displayDestinations[3].is_featured && (
              <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground border-0">
                Aventura
              </Badge>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <div className="flex items-center gap-2 text-background/80 text-xs mb-1">
                <MapPin className="h-3 w-3" />
                {displayDestinations[3].region}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-background">
                {displayDestinations[3].name}
              </h3>
            </div>
          </div>

          {/* Sixth destination - Wide */}
          <div className="col-span-2 group relative rounded-3xl overflow-hidden h-[200px] md:h-[240px]">
            <Image
              src={displayDestinations[5].image_url || "/placeholder.svg?height=240&width=400"}
              alt={displayDestinations[5].name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <div className="flex items-center gap-2 text-background/80 text-xs mb-1">
                <MapPin className="h-3 w-3" />
                {displayDestinations[5].region}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-background">
                {displayDestinations[5].name}
              </h3>
            </div>
          </div>

          {/* Full Day - Special card spanning full width */}
          <div className="col-span-2 md:col-span-4 group relative rounded-3xl overflow-hidden h-[220px] md:h-[260px]">
            {/* Full background image */}
            <Image
              src="/images/fulldy.jpg"
              alt="Paisaje de excursión Full Day"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Dark overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/30 to-foreground/10" />
            {/* Badge */}
            <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground border-0 z-10">
              <Sun className="h-3 w-3 mr-1" />
              Especial
            </Badge>
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-10">
              <h3 className="text-xl md:text-2xl font-bold text-background mb-1">
                Full Day
              </h3>
              <p className="text-background/80 text-sm mb-3">
                Excursiones de día completo a los mejores destinos
              </p>
              <button
                onClick={() => document.getElementById("paquetes")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 text-primary font-medium group/btn"
              >
                Ver opciones
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
