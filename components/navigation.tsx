"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, Instagram, Facebook, Phone } from "lucide-react"

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#paquetes", label: "Paquetes" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#destinos", label: "Destinos" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#contacto", label: "Contacto" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Account for top bar height (40px approx)
      setIsScrolled(window.scrollY > 80)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Photoroom%20%281%29-r08pEFoYldsBYyCxb46ze3Gjnp15Qc.png"
              alt="Turismeando"
              width={84}
              height={84}
              className="object-contain"
            />
            <div className={`hidden sm:block transition-colors ${isScrolled ? "text-foreground" : "text-background"}`}>
              <span className="font-bold text-lg">TURISMEANDO</span>
              <span className="block text-xs opacity-80">Viajes y Turismo</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isScrolled ? "text-foreground" : "text-background"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://www.instagram.com/turismeandoxargentina"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full transition-colors ${
                isScrolled ? "hover:bg-muted" : "hover:bg-background/10"
              }`}
            >
              <Instagram className={`h-5 w-5 ${isScrolled ? "text-foreground" : "text-background"}`} />
            </a>
            <a
              href="https://www.facebook.com/turismeandoxargentina"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full transition-colors ${
                isScrolled ? "hover:bg-muted" : "hover:bg-background/10"
              }`}
            >
              <Facebook className={`h-5 w-5 ${isScrolled ? "text-foreground" : "text-background"}`} />
            </a>
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6"
            >
              <a
                href="https://wa.me/91140825947?text=Hola!%20Me%20interesa%20conocer%20más%20sobre%20los%20paquetes%20de%20viajes."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="h-4 w-4 mr-2" />
                Contactar
              </a>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className={isScrolled ? "text-foreground" : "text-background"}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-background">
              <div className="flex flex-col h-full py-6">
                <div className="flex items-center justify-between mb-8">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Photoroom%20%281%29-r08pEFoYldsBYyCxb46ze3Gjnp15Qc.png"
                    alt="Turismeando"
                    width={70}
                    height={70}
                  />
                </div>

                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => scrollToSection(link.href)}
                      className="text-left text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                    >
                      {link.label}
                    </button>
                  ))}
                </nav>

                <div className="mt-auto flex flex-col gap-4">
                  <a
                    href="https://www.instagram.com/turismeandoxargentina"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                    @turismeandoxargentina
                  </a>
                  <Button
                    asChild
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-full"
                  >
                    <a
                      href="https://wa.me/91140825947?text=Hola!%20Me%20interesa%20conocer%20más%20sobre%20los%20paquetes%20de%20viajes."
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Contactar por WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  )
}
