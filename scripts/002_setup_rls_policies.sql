-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can read active packages" ON public.packages;
DROP POLICY IF EXISTS "Authenticated users can manage packages" ON public.packages;
DROP POLICY IF EXISTS "Anyone can read categories" ON public.categories;
DROP POLICY IF EXISTS "Anyone can read destinations" ON public.destinations;
DROP POLICY IF EXISTS "Anyone can create inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Authenticated users can read inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Authenticated users can update inquiries" ON public.inquiries;

-- Packages policies
-- Public can read active packages
CREATE POLICY "Anyone can read active packages" ON public.packages 
  FOR SELECT USING (is_active = true);

-- Authenticated users can read all packages (including inactive for admin)
CREATE POLICY "Authenticated can read all packages" ON public.packages 
  FOR SELECT TO authenticated USING (true);

-- Authenticated users can insert packages
CREATE POLICY "Authenticated can insert packages" ON public.packages 
  FOR INSERT TO authenticated WITH CHECK (true);

-- Authenticated users can update packages
CREATE POLICY "Authenticated can update packages" ON public.packages 
  FOR UPDATE TO authenticated USING (true);

-- Authenticated users can delete packages
CREATE POLICY "Authenticated can delete packages" ON public.packages 
  FOR DELETE TO authenticated USING (true);

-- Categories policies (if table exists)
DO $$ 
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'categories') THEN
    EXECUTE 'CREATE POLICY "Anyone can read categories" ON public.categories FOR SELECT USING (true)';
    EXECUTE 'CREATE POLICY "Authenticated can manage categories" ON public.categories FOR ALL TO authenticated USING (true) WITH CHECK (true)';
  END IF;
END $$;

-- Destinations policies (if table exists)  
DO $$ 
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'destinations') THEN
    EXECUTE 'CREATE POLICY "Anyone can read destinations" ON public.destinations FOR SELECT USING (true)';
    EXECUTE 'CREATE POLICY "Authenticated can manage destinations" ON public.destinations FOR ALL TO authenticated USING (true) WITH CHECK (true)';
  END IF;
END $$;

-- Inquiries policies
-- Anyone can create inquiries (contact form)
CREATE POLICY "Anyone can create inquiries" ON public.inquiries 
  FOR INSERT WITH CHECK (true);

-- Authenticated users can read all inquiries
CREATE POLICY "Authenticated can read inquiries" ON public.inquiries 
  FOR SELECT TO authenticated USING (true);

-- Authenticated users can update inquiries (change status)
CREATE POLICY "Authenticated can update inquiries" ON public.inquiries 
  FOR UPDATE TO authenticated USING (true);

-- Authenticated users can delete inquiries
CREATE POLICY "Authenticated can delete inquiries" ON public.inquiries 
  FOR DELETE TO authenticated USING (true);
