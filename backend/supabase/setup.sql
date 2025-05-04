-- Enable Row Level Security on all tables
DO $$
DECLARE
  table_record RECORD;
BEGIN
  FOR table_record IN SELECT tablename FROM pg_tables 
  WHERE schemaname = 'public' AND tablename != 'schema_migrations'
  LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', table_record.tablename);
    EXECUTE format('CREATE POLICY "Enable read access for authenticated users" ON %I FOR SELECT USING (auth.role() = ''authenticated'')', table_record.tablename);
  END LOOP;
END $$;

-- Create profiles table if not exists
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();
