import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Eye } from "lucide-react"
import Link from "next/link"

async function getStats() {
  try {
    const supabase = await createClient()
    
    const [packagesResult, featuredResult, activeResult] = await Promise.all([
      supabase.from("packages").select("id", { count: "exact", head: true }),
      supabase.from("packages").select("id", { count: "exact", head: true }).eq("is_featured", true),
      supabase.from("packages").select("id", { count: "exact", head: true }).eq("is_active", true),
    ])

    return {
      totalPackages: packagesResult.count || 0,
      featuredPackages: featuredResult.count || 0,
      activePackages: activeResult.count || 0,
    }
  } catch (error) {
    console.error('[v0] Error fetching stats:', error)
    return { totalPackages: 0, featuredPackages: 0, activePackages: 0 }
  }
}

async function getRecentPackages() {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from("packages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5)
    return data || []
  } catch (error) {
    console.error('[v0] Error fetching packages:', error)
    return []
  }
}

export default async function AdminDashboard() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      redirect("/admin/login")
    }
  } catch (error) {
    console.error('[v0] Error checking auth:', error)
    redirect("/admin/login")
  }

  const [stats, recentPackages] = await Promise.all([
    getStats(),
    getRecentPackages(),
  ])

  const statCards = [
    {
      title: "Paquetes Totales",
      value: stats.totalPackages,
      icon: Package,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Paquetes Activos",
      value: stats.activePackages,
      icon: Package,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      title: "Paquetes Destacados",
      value: stats.featuredPackages,
      icon: Eye,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
  ]

  return (
    <div className="min-h-screen bg-muted">
      <AdminSidebar />
      
      <main className="lg:pl-64 pt-16 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Bienvenido al panel de administración de Turismeando
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {statCards.map((stat) => (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold text-foreground mt-1">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Packages */}
          <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center gap-2 sm:justify-between">
                <div>
                  <CardTitle>Paquetes Recientes</CardTitle>
                  <CardDescription>Últimos paquetes creados</CardDescription>
                </div>
                <Link
                  href="/admin/packages"
                  className="text-sm text-primary hover:underline"
                >
                  Ver todos
                </Link>
              </CardHeader>
              <CardContent>
                {recentPackages.length === 0 ? (
                  <p className="text-muted-foreground text-sm">
                    No hay paquetes aún
                  </p>
                ) : (
                  <div className="space-y-4">
                    {recentPackages.map((pkg: { id: string; name: string; destination: string; price: number | null; is_active: boolean }) => (
                      <div
                        key={pkg.id}
                        className="flex items-center justify-between border-b border-border pb-3 last:border-0"
                      >
                        <div>
                          <p className="font-medium text-foreground">
                            {pkg.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {pkg.destination}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">
                            ${pkg.price?.toLocaleString("es-AR")}
                          </p>
                          <span
                            className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${
                              pkg.is_active
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {pkg.is_active ? "Activo" : "Inactivo"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
