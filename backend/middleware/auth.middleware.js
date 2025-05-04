import supabase from '../config/supabase.js';

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Authorization token required' });
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error) throw error;
    if (!user) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ error: error.message });
  }
};

export default verifyToken;