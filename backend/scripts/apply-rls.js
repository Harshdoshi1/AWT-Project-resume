const { exec } = require('child_process');
const supabase = require('../config/supabase');

// Apply RLS policies from SQL file
exec(`psql ${process.env.SUPABASE_DB_URL} -f scripts/enable-rls.sql`, (error, stdout, stderr) => {
  if (error) {
    console.error('Error applying RLS:', error);
    return;
  }
  console.log('RLS policies applied successfully');
});
