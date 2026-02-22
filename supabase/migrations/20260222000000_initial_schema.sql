-- Supabase Schema for nangmangom Portfolio

-- 1. Create the Media Table
CREATE TABLE public.media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('Photo', 'Portrait', 'Landscape', 'Snap', 'Video')),
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Set up RLS (Row Level Security)
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

-- 3. Create Policies
-- Allow anyone to read the media (for the public gallery)
CREATE POLICY "Public media are viewable by everyone."
  ON public.media FOR SELECT
  USING (true);

-- Allow only authenticated admins to insert/update/delete
CREATE POLICY "Admins can insert media."
  ON public.media FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins can update media."
  ON public.media FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete media."
  ON public.media FOR DELETE
  USING (auth.role() = 'authenticated');

-- 4. Storage Bucket configuration
-- Create a new public bucket named 'portfolio-media'
insert into storage.buckets (id, name, public) 
values ('portfolio-media', 'portfolio-media', true);

-- Storage Policies
-- Public can read images/videos
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'portfolio-media');

-- Only authenticated users can upload/delete
create policy "Admin Upload"
  on storage.objects for insert
  with check ( bucket_id = 'portfolio-media' AND auth.role() = 'authenticated' );

create policy "Admin Delete"
  on storage.objects for delete
  using ( bucket_id = 'portfolio-media' AND auth.role() = 'authenticated' );
