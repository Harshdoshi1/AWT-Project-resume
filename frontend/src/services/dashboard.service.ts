import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface DashboardStats {
  stats: {
    total: number;
    completed: number;
    inProgress: number;
  };
  recentActivity: {
    id: string;
    action: string;
    date: string;
    resumeName: string;
    details?: string;
  }[];
  upcomingDeadlines: {
    id: string;
    title: string;
    company?: string;
    date: string;
    notes?: string;
  }[];
}

export interface DeadlineInput {
  title: string;
  company?: string;
  deadline_date: string;
  notes?: string;
}

const dashboardService = {
  /**
   * Get dashboard statistics for the current user
   */
  getDashboardStats: async (): Promise<DashboardStats> => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/dashboard/stats`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },

  /**
   * Add a new deadline
   */
  addDeadline: async (deadlineData: DeadlineInput) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/dashboard/deadlines`, deadlineData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error adding deadline:', error);
      throw error;
    }
  }
};

export default dashboardService;
