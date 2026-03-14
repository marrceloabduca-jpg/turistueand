-- Create packages table for travel packages
CREATE TABLE IF NOT EXISTS public.packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT,
  destination TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'aventura',
  duration TEXT NOT NULL,
  group_size TEXT,
  price DECIMAL(10, 2),
  original_price DECIMAL(10, 2),
  image_url TEXT,
  gallery TEXT[] DEFAULT '{}',
  includes TEXT[] DEFAULT '{}',
  highlights TEXT[] DEFAULT '{}',
  itinerary JSONB DEFAULT '[]',
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  departure_dates TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create destinations table
CREATE TABLE IF NOT EXISTS public.destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  region TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create inquiries table for contact form submissions
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  package_id UUID REFERENCES public.packages(id) ON DELETE SET NULL,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Public read policies (anyone can read active packages, categories, destinations)
CREATE POLICY "Anyone can read active packages" ON public.packages 
  FOR SELECT USING (is_active = true);

CREATE POLICY "Anyone can read categories" ON public.categories 
  FOR SELECT USING (true);

CREATE POLICY "Anyone can read destinations" ON public.destinations 
  FOR SELECT USING (true);

-- Admin policies for full CRUD (using service role or checking user metadata)
-- Note: Admin operations will use service role key which bypasses RLS

-- Allow anyone to create inquiries (contact form)
CREATE POLICY "Anyone can create inquiries" ON public.inquiries 
  FOR INSERT WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger for packages
DROP TRIGGER IF EXISTS update_packages_updated_at ON public.packages;
CREATE TRIGGER update_packages_updated_at
  BEFORE UPDATE ON public.packages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_packages_category ON public.packages(category);
CREATE INDEX IF NOT EXISTS idx_packages_destination ON public.packages(destination);
CREATE INDEX IF NOT EXISTS idx_packages_is_active ON public.packages(is_active);
CREATE INDEX IF NOT EXISTS idx_packages_is_featured ON public.packages(is_featured);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);
