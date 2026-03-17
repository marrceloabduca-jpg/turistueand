"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { MapPin, ArrowRight, Sun } from "lucide-react"
import type { Destination } from "@/lib/types"

interface DestinationsProps {
  destinations: Destination[]
}

// Images to use in the Full Day collage card
const FULL_DAY_COLLAGE_IMAGES = [
  { src: "/images/iguazu.jpg", alt: "Cataratas del Iguazú" },
  { src: "/images/salta.jpg", alt: "Salta" },
  { src: "/images/carlospaz.svg", alt: "Carlos Paz" },
]

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
    image_url: "/images/federacion.svg",
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Carlos Paz",
    slug: "carlos-paz",
    region: "Córdoba",
    description: "El lago y las sierras cordobesas",
    image_url: "/images/carlospaz.svg",
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Merlo",
    slug: "merlo",
    region: "San Luis",
    description: "El microclima especial de las sierras",
    image_url: "/images/merlo.svg",
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    name: "San Rafael",
    slug: "san-rafael",
    region: "Mendoza",
    description: "Viñedos y aventura al pie de los Andes",
    image_url: "/images/sanrafael.svg",
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

          {/* Full Day - Special collage card spanning full width */}
          <div className="col-span-2 md:col-span-4 group relative rounded-3xl overflow-hidden h-[220px] md:h-[260px]">
            {/* Three-photo collage */}
            <div className="absolute inset-0 grid grid-cols-3 gap-1">
              {FULL_DAY_COLLAGE_IMAGES.map((img) => (
                <div key={img.src} className="relative overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
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
