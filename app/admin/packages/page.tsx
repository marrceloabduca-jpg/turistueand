import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"
import { PackagesTable } from "@/components/admin/packages-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

async function getPackages() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching packages:", error)
    return []
  }

  return data || []
}

export default async function AdminPackagesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const packages = await getPackages()

  return (
    <div className="min-h-screen bg-muted">
      <AdminSidebar />

      <main className="lg:pl-64 pt-16 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                Paquetes de Viaje
              </h1>
              <p className="text-muted-foreground mt-1">
                Gestioná todos los paquetes de viaje
              </p>
            </div>
            <Link href="/admin/packages/new">
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Paquete
              </Button>
            </Link>
          </div>

          <PackagesTable packages={packages} />
        </div>
      </main>
    </div>
  )
}
