"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Fabiana Torresel",
    location: "Instagram",
    destination: "Argentina",
    rating: 5,
    text: "Muy lindo viaje 🦋. Excelentes excursiones una más linda que otra. Un súper coordinador. Gracias por hacernos pasar unos días maravillosos",
    avatar: "FT"
  },
  {
    id: 2,
    name: "Rosa Gonzalez",
    location: "Instagram",
    destination: "Argentina",
    rating: 5,
    text: "Excelente viaje, excelente atención y coordinación, gracias Maty. Todos los lugares son hermosos, no puedo elegir uno.",
    avatar: "RG"
  },
  {
    id: 3,
    name: "Joana Berengo",
    location: "Instagram",
    destination: "Altas Cumbres",
    rating: 5,
    text: "La verdad que este viaje fue una locura!! Y este día en particular fue mágico! El camino a altas cumbres, ver el amanecer por encima de las nubes fue algo espectacular!! Disfruté cada parada, cada vista, cada paisaje! Los túneles no los conocía y me encantaron, muy imponente la vista en las alturas! 🌅☁️🏔. Quedé encantada con este viaje y toda la atención! Volvería siempre! 👏",
    avatar: "JB"
  },
  {
    id: 4,
    name: "Gladys Bava",
    location: "Instagram",
    destination: "Argentina",
    rating: 5,
    text: "Un genio Mati, un viaje hermoso❤️ imposible elegir un lugar, todos fueron más de lo que esperábamos😍",
    avatar: "GB"
  },
  {
    id: 5,
    name: "Viajero anónimo",
    location: "WhatsApp",
    destination: "Tierra Vasca",
    rating: 5,
    text: "Hola Matías la verdad que Tierra Vazca, no me gustó. Me encantó, en realidad nos encantó a todos. Espetacular, la voy a recomendar a todos mis conocidos. Ojalá para la próxima, puedas mandar un micro a Pacheco 🙏🙏🙏",
    avatar: "WA"
  },
  {
    id: 6,
    name: "Viajero anónimo",
    location: "WhatsApp",
    destination: "Tierra Vasca",
    rating: 5,
    text: "Hermoso día pasamos en Tierra vasca, gracias x su atención, muy amable la coordinadora. Los voy a volver a elegir 🩷",
    avatar: "WA"
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section id="testimonios" className="py-24 bg-foreground">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-primary/20 text-primary border-0">
            Testimonios
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-background mb-6">
            Lo que dicen nuestros <span className="text-primary">viajeros</span>
          </h2>
          <p className="text-background/70 text-lg leading-relaxed">
            Más de 2,000 personas ya viajaron con nosotros. 
            Conocé sus experiencias y sumate a la aventura.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-background/5 border-background/10 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <Quote className="h-12 w-12 text-primary/30 mb-6" />
              
              <p className="text-xl md:text-2xl text-background leading-relaxed mb-8">
                {`"${testimonials[currentIndex].text}"`}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {testimonials[currentIndex].avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-background text-lg">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-background/60 text-sm">
                      {testimonials[currentIndex].location} - Viaje a {testimonials[currentIndex].destination}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            className="rounded-full border-background/20 text-background hover:bg-background/10 hover:text-background"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false)
                  setCurrentIndex(index)
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? "w-8 bg-primary" 
                    : "bg-background/30 hover:bg-background/50"
                }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            className="rounded-full border-background/20 text-background hover:bg-background/10 hover:text-background"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "4.9/5", label: "Calificación promedio" },
            { value: "+500", label: "Reseñas positivas" },
            { value: "98%", label: "Recomendarían" },
            { value: "+2,000", label: "Viajeros felices" },
          ].map((stat, index) => (
            <div key={index}>
              <p className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</p>
              <p className="text-background/60 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
