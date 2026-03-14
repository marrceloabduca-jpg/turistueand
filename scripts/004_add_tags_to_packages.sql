-- Add tags column to packages table for month pills and custom labels
ALTER TABLE public.packages
  ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';
