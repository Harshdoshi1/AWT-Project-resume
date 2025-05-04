const supabase = require('../config/supabase');

async function setupDatabase() {
  try {
    // Create Users table
    const { error: usersError } = await supabase
      .from('users')
      .create([
        {
          id: 1,
          email: 'example@example.com',
          full_name: 'Example User',
          created_at: new Date().toISOString()
        }
      ]);

    if (usersError) throw usersError;

    // Create Resumes table
    const { error: resumesError } = await supabase
      .from('resumes')
      .create([
        {
          id: 1,
          user_id: 1,
          title: 'Sample Resume',
          template: 'modern',
          sections: { personal: {}, education: [] },
          created_at: new Date().toISOString()
        }
      ]);

    if (resumesError) throw resumesError;

    console.log('Database tables created successfully');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

setupDatabase();
