-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;

-- User policies
CREATE POLICY "Users can manage their own data" 
ON users FOR ALL USING (auth.uid() = id);

-- Resume policies
CREATE POLICY "Users can view their resumes" 
ON resumes FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their resumes" 
ON resumes FOR ALL USING (auth.uid() = user_id);
