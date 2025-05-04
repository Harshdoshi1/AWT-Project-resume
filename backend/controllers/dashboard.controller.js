import { createError } from '../utils/error.js';

// Get dashboard statistics for the current user
const getDashboardStats = async (req, res, next) => {
  try {
    const { supabase } = req.app.locals;
    const userId = req.user.id; // Assuming user ID is available from auth middleware

    // Get resume count statistics
    const { data: resumes, error: resumeError } = await supabase
      .from('resumes')
      .select('id, status')
      .eq('user_id', userId);

    if (resumeError) {
      return next(createError(500, 'Error fetching resume statistics'));
    }

    // Calculate statistics
    const total = resumes.length;
    const completed = resumes.filter(resume => resume.status === 'completed').length;
    const inProgress = resumes.filter(resume => resume.status === 'in_progress').length;

    // Get recent activity
    const { data: activities, error: activityError } = await supabase
      .from('user_activities')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(5);

    if (activityError) {
      return next(createError(500, 'Error fetching user activities'));
    }

    // Get upcoming deadlines
    const { data: deadlines, error: deadlineError } = await supabase
      .from('application_deadlines')
      .select('*')
      .eq('user_id', userId)
      .gte('deadline_date', new Date().toISOString())
      .order('deadline_date', { ascending: true })
      .limit(3);

    if (deadlineError) {
      return next(createError(500, 'Error fetching deadlines'));
    }

    // Format the response
    const dashboardData = {
      stats: {
        total,
        completed,
        inProgress
      },
      recentActivity: activities.map(activity => ({
        id: activity.id,
        action: activity.action_type,
        date: activity.created_at,
        resumeName: activity.resume_name || 'Unnamed Resume',
        details: activity.details
      })),
      upcomingDeadlines: deadlines.map(deadline => ({
        id: deadline.id,
        title: deadline.title,
        company: deadline.company,
        date: deadline.deadline_date,
        notes: deadline.notes
      }))
    };

    res.status(200).json(dashboardData);
  } catch (error) {
    console.error('Dashboard stats error:', error);
    next(createError(500, 'Error fetching dashboard data'));
  }
};

// Add a new deadline
const addDeadline = async (req, res, next) => {
  try {
    const { supabase } = req.app.locals;
    const userId = req.user.id;
    const { title, company, deadline_date, notes } = req.body;

    // Validate required fields
    if (!title || !deadline_date) {
      return next(createError(400, 'Title and deadline date are required'));
    }

    // Insert the new deadline
    const { data, error } = await supabase
      .from('application_deadlines')
      .insert({
        user_id: userId,
        title,
        company,
        deadline_date,
        notes
      })
      .select();

    if (error) {
      return next(createError(500, 'Error adding deadline'));
    }

    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Add deadline error:', error);
    next(createError(500, 'Error adding deadline'));
  }
};

export default {
  getDashboardStats,
  addDeadline
};
