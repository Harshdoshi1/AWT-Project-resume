import supabase from '../config/supabase.js';

// Create a new resume
export const createResume = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('resumes')
      .insert([{
        user_id: req.user.id,
        ...req.body
      }])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all resumes for user
export const getUserResumes = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('resumes')
      .select()
      .eq('user_id', req.user.id);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single resume
export const getResume = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('resumes')
      .select()
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update resume
export const updateResume = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('resumes')
      .update(req.body)
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete resume
export const deleteResume = async (req, res) => {
  try {
    const { error } = await supabase
      .from('resumes')
      .delete()
      .eq('id', req.params.id)
      .eq('user_id', req.user.id);

    if (error) throw error;
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};