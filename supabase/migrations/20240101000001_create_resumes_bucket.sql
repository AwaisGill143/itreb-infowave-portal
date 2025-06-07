
-- Create storage bucket for resumes if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'resumes',
  'resumes',
  true,
  5242880, -- 5MB limit
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to upload files
CREATE POLICY IF NOT EXISTS "Allow public uploads to resumes bucket"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'resumes');

-- Allow public access to read files
CREATE POLICY IF NOT EXISTS "Allow public read access to resumes bucket"
ON storage.objects
FOR SELECT
USING (bucket_id = 'resumes');
