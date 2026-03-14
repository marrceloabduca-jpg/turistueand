import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"
import { PackageForm } from "@/components/admin/package-form"

interface EditPackagePageProps {
  params: Promise<{ id: string }>
}

export default async function EditPackagePage({ params }: EditPackagePageProps) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data: packageData, error } = await supabase
    .from("packages")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !packageData) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-muted">
      <AdminSidebar />

      <main className="lg:pl-64 pt-16 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          <PackageForm initialData={packageData} />
        </div>
      </main>
    </div>
  )
}
