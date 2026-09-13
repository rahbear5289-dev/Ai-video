-- Enable RLS on news_feed table
ALTER TABLE news_feed ENABLE ROW LEVEL SECURITY;

-- Policy: Only permanent users can post to the news feed
CREATE POLICY "Only permanent users can post to the news feed"
ON news_feed
AS RESTRICTIVE
FOR INSERT
TO authenticated
WITH CHECK (
  (auth.jwt() ->> 'is_anonymous')::boolean IS FALSE
);

-- Policy: Anonymous and permanent users can view the news feed
CREATE POLICY "Anonymous and permanent users can view the news feed"
ON news_feed
FOR SELECT
TO authenticated
USING (true);

-- Optional: Also allow service role full access
CREATE POLICY "Service role has full access"
ON news_feed
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);