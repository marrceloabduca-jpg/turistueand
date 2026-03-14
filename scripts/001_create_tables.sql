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
  admin_fee DECIMAL(10, 2),
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
