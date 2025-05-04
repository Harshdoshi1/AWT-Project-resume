// No login or signup logic to remove, as the original code document was empty.

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    
    res.status(200).json({ 
      success: true,
      message: 'Login successful',
      user: data.user
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

const logout = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) throw error;
    
    res.status(200).json({ 
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

export default { loginUser, logout };