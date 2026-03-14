"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { MapPin, ArrowRight } from "lucide-react"
import type { Destination } from "@/lib/types"

interface DestinationsProps {
  destinations: Destination[]
}

// Fallback destinations for when DB is empty
const fallbackDestinations: Destination[] = [
  {
    id: "1",
    name: "Bariloche",
    slug: "bariloche",
    region: "Patagonia",
    description: "Lagos y montañas espectaculares",
    image_url: "/images/bariloche.jpg",
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Cataratas del Iguazú",
    slug: "iguazu",
    region: "Misiones",
    description: "Una de las 7 maravillas naturales",
    image_url: "/images/iguazu.jpg",
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Mendoza",
    slug: "mendoza",
    region: "Cuyo",
    description: "Capital del vino argentino",
    image_url: "/images/mendoza.jpg",
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Salta y Jujuy",
    slug: "salta",
    region: "Norte Argentino",
    description: "Colores y cultura del NOA",
    image_url: "/images/salta.jpg",
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Ushuaia",
    slug: "ushuaia",
    region: "Tierra del Fuego",
    description: "El fin del mundo",
    image_url: "/images/ushuaia.jpg",
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Buenos Aires",
    slug: "buenos-aires",
    region: "Capital Federal",
    description: "La ciudad del tango",
    image_url: "/images/buenosaires.jpg",
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
            Desde la inmensidad de la Patagonia hasta las coloridas montañas del Norte, 
            cada rincón del país tiene algo especial para vos.
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
        </div>
      </div>
    </section>
  )
}
