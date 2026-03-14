"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function HeroScrollButton() {
  return (
    <button
      onClick={() => document.getElementById("paquetes")?.scrollIntoView({ behavior: "smooth" })}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-background/60 hover:text-background transition-colors cursor-pointer"
    >
      <span className="text-sm font-medium">Explorar</span>
      <ChevronDown className="h-6 w-6 animate-bounce" />
    </button>
  )
}

export function HeroPackagesButton() {
  return (
    <Button
      variant="outline"
      size="lg"
      className="border-background/30 text-background hover:bg-background/10 text-lg px-8 py-6 rounded-full backdrop-blur-sm"
      onClick={() => document.getElementById("paquetes")?.scrollIntoView({ behavior: "smooth" })}
    >
      Ver Paquetes Disponibles
    </Button>
  )
}
