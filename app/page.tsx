import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { Packages } from "@/components/packages"
import { About } from "@/components/about"
import { Destinations } from "@/components/destinations"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { getPackages, getCategories, getFeaturedDestinations } from "@/lib/data"

export const revalidate = 60 // Revalidate every 60 seconds

export default async function Home() {
  const [packages, categories, destinations] = await Promise.all([
    getPackages(),
    getCategories(),
    getFeaturedDestinations(),
  ])

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Packages packages={packages} categories={categories} />
      <About />
      <Destinations destinations={destinations} />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
