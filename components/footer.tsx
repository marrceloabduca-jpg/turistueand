"use client"

import Image from "next/image"
import { Instagram, Facebook, MessageCircle, MapPin, Phone, Heart, Mail } from "lucide-react"

const quickLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Paquetes", href: "#paquetes" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Destinos", href: "#destinos" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Contacto", href: "#contacto" },
]

const destinations = [
  "Bariloche",
  "Cataratas del Iguazú",
  "Mendoza",
  "Salta y Jujuy",
  "Ushuaia",
  "Buenos Aires",
]

export function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Photoroom%20%281%29-r08pEFoYldsBYyCxb46ze3Gjnp15Qc.png"
                alt="Turismeando"
                width={60}
                height={60}
              />
              <div>
                <span className="font-bold text-lg text-background">TURISMEANDO</span>
                <span className="block text-xs text-background/70">Viajes y Turismo</span>
              </div>
            </div>
            <p className="text-background/70 leading-relaxed mb-6">
              Tu agencia de viajes de confianza. Más de 10 años creando experiencias 
              inolvidables por toda Argentina.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/turismeandoxargentina"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/turismeando"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/5491140825947"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-[#25D366] transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-background mb-6">Enlaces</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-bold text-background mb-6">Destinos</h4>
            <ul className="space-y-3">
              {destinations.map((destination) => (
                <li key={destination}>
                  <button
                    onClick={() => scrollToSection("#paquetes")}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {destination}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-background mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://wa.me/5491140825947"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  +54 9 11 4082-5947
                </a>
              </li>
              <li>
                <a
                  href="mailto:Turismeandoxargentina@gmail.com"
                  className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  Turismeandoxargentina@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/turismeandoxargentina"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                  @turismeandoxargentina
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/turismeando"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                  turismeando
                </a>
              </li>
              <li className="flex items-start gap-3 text-background/70">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <span>Argentina</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/50 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Turismeando - Viajes y Turismo. Todos los derechos reservados.
            </p>
            <p className="text-background/50 text-sm flex items-center gap-1">
              Hecho con <Heart className="h-4 w-4 text-primary fill-primary" /> en Argentina
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
