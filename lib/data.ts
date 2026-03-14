import { createClient } from '@/lib/supabase/server'
import type { Package, Category, Destination, Inquiry } from './types'

// Helper to safely create client
async function getSupabaseClient() {
  try {
    return await createClient()
  } catch (error) {
    console.error('[v0] Supabase client error:', error)
    return null
  }
}

// Packages
export async function getPackages(): Promise<Package[]> {
  const supabase = await getSupabaseClient()
  if (!supabase) return []
  
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .eq('is_active', true)
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[v0] Error fetching packages:', error)
    return []
  }

  return data || []
}

export async function getFeaturedPackages(): Promise<Package[]> {
  const supabase = await getSupabaseClient()
  if (!supabase) return []
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(6)

  if (error) {
    console.error('[v0] Error fetching featured packages:', error)
    return []
  }

  return data || []
}

export async function getPackageBySlug(slug: string): Promise<Package | null> {
  const supabase = await getSupabaseClient()
  if (!supabase) return null
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('[v0] Error fetching package:', error)
    return null
  }

  return data
}

export async function getPackagesByCategory(category: string): Promise<Package[]> {
  const supabase = await getSupabaseClient()
  if (!supabase) return []
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .eq('is_active', true)
    .eq('category', category)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[v0] Error fetching packages by category:', error)
    return []
  }

  return data || []
}

// Categories
export async function getCategories(): Promise<Category[]> {
  const supabase = await getSupabaseClient()
  if (!supabase) return []
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true })

  if (error) {
    console.error('[v0] Error fetching categories:', error)
    return []
  }

  return data || []
}

// Destinations
export async function getDestinations(): Promise<Destination[]> {
  const supabase = await getSupabaseClient()
  if (!supabase) return []
  const { data, error } = await supabase
    .from('destinations')
    .select('*')
    .order('is_featured', { ascending: false })
    .order('name', { ascending: true })

  if (error) {
    console.error('[v0] Error fetching destinations:', error)
    return []
  }

  return data || []
}

export async function getFeaturedDestinations(): Promise<Destination[]> {
  const supabase = await getSupabaseClient()
  if (!supabase) return []
  const { data, error } = await supabase
    .from('destinations')
    .select('*')
    .eq('is_featured', true)
    .order('name', { ascending: true })
    .limit(6)

  if (error) {
    console.error('[v0] Error fetching featured destinations:', error)
    return []
  }

  return data || []
}

// Inquiries
export async function createInquiry(inquiry: {
  name: string
  email?: string
  phone?: string
  package_id?: string
  message?: string
}): Promise<{ success: boolean; error?: string }> {
  const supabase = await getSupabaseClient()
  if (!supabase) return { success: false, error: 'Database not available' }
  const { error } = await supabase.from('inquiries').insert([inquiry])

  if (error) {
    console.error('[v0] Error creating inquiry:', error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

// Stats for Hero section
export async function getStats(): Promise<{
  destinations: number
  packages: number
}> {
  const supabase = await getSupabaseClient()
  if (!supabase) return { destinations: 8, packages: 10 }
  
  const [destinationsResult, packagesResult] = await Promise.all([
    supabase.from('destinations').select('id', { count: 'exact', head: true }),
    supabase.from('packages').select('id', { count: 'exact', head: true }).eq('is_active', true),
  ])

  return {
    destinations: destinationsResult.count || 0,
    packages: packagesResult.count || 0,
  }
}
