import { useState, useEffect } from 'react';
import { 
  FiPlus, FiFile, FiClock, FiCheckCircle, 
  FiBarChart2, FiCalendar, FiActivity, 
  FiDownload, FiChevronRight 
} from 'react-icons/fi';
import ClickSpark from '../components/ClickSpark';
import styles from './Dashboard.module.css';
import dashboardService, { DashboardStats } from '../services/dashboard.service';
import { toast } from 'react-toastify';

// New sub-components
const StatItem = ({ icon, value, label, color }) => (
  <div className={styles.statItem}>
    <div className={styles.statIcon} style={{ backgroundColor: `${color}20` }}>
      {icon}
    </div>
    <div>
      <div className={styles.statValue}>{value}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  </div>
);

const ActivityItem = ({ type, title, date, action }) => (
  <div className={styles.activityItem}>
    <div className={`${styles.activityIcon} ${styles[type]}`}>
      {type === 'create' ? <FiPlus /> : 
       type === 'update' ? <FiClock /> : <FiDownload />}
    </div>
    <div className={styles.activityContent}>
      <div className={styles.activityTitle}>{title}</div>
      <div className={styles.activityAction}>{action}</div>
    </div>
    <div className={styles.activityDate}>{date}</div>
    <FiChevronRight className={styles.activityArrow} />
  </div>
);

const DeadlineItem = ({ title, company, date, daysLeft }) => (
  <div className={styles.deadlineItem}>
    <div className={styles.deadlineIcon}>
      <FiCalendar />
    </div>
    <div className={styles.deadlineContent}>
      <div className={styles.deadlineTitle}>{title}</div>
      {company && <div className={styles.deadlineCompany}>{company}</div>}
    </div>
    <div className={styles.deadlineDate}>
      <div>{date}</div>
      <div className={styles.deadlineDays}>{daysLeft} days left</div>
    </div>
  </div>
);

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await dashboardService.getDashboardStats();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data. Using sample data instead.');
        
        setDashboardData({
          stats: {
            total: 5,
            completed: 3,
            inProgress: 2
          },
          recentActivity: [
            { id: '1', action: 'Created new resume', date: '2025-04-14', resumeName: 'Software Engineer Resume' },
            { id: '2', action: 'Updated resume', date: '2025-04-13', resumeName: 'Product Manager Resume' },
            { id: '3', action: 'Downloaded resume', date: '2025-04-12', resumeName: 'UX Designer Resume' },
          ],
          upcomingDeadlines: [
            { id: '1', title: 'Google Application', company: 'Google', date: '2025-04-20', notes: 'Submit updated resume' },
            { id: '2', title: 'Microsoft Interview', company: 'Microsoft', date: '2025-04-25', notes: 'Prepare for technical interview' }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleAddDeadline = async () => {
    toast.info('Add deadline functionality would open a form here');
  };

  const completionPercentage = dashboardData?.stats.total > 0 
    ? (dashboardData.stats.completed / dashboardData.stats.total) * 100 
    : 0;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const calculateDaysLeft = (dateString: string) => {
    const today = new Date();
    const deadline = new Date(dateString);
    const diffTime = Math.max(0, deadline.getTime() - today.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <div className={styles.dashboardContainer}>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle} style={{
          background: 'linear-gradient(45deg, #191A19, #4E9F3D, #B4BDFF, #D8E9A8)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          textShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          Resume Dashboard
        </h1>
      </div>

      <div className={styles.gridContainer}>
        <div className={`${styles.card} ${styles.statsCard}`}>
          <h2 className={styles.cardTitle}>Your Progress</h2>
          <div className={styles.statGrid}>
            <StatItem 
              icon={<FiFile size={20} />}
              value={dashboardData?.stats.total || 0}
              label="Total Resumes"
              color="#4E9F3D"
            />
            <StatItem 
              icon={<FiCheckCircle size={20} />}
              value={dashboardData?.stats.completed || 0}
              label="Completed"
              color="#B4BDFF"
            />
            <StatItem 
              icon={<FiClock size={20} />}
              value={dashboardData?.stats.inProgress || 0}
              label="In Progress"
              color="#D8E9A8"
            />
            <div className={styles.progressContainer}>
              <div className={styles.progressText}>
                {completionPercentage.toFixed(0)}% Complete
              </div>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill} 
                  style={{ 
                    width: `${completionPercentage}%`,
                    background: 'linear-gradient(90deg, #4E9F3D, #B4BDFF)'
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.card} ${styles.activityCard}`}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Recent Activity</h2>
            <button className={styles.viewAllButton}>View All</button>
          </div>
          <div className={styles.activityList}>
            {dashboardData?.recentActivity.map((activity) => (
              <ActivityItem 
                key={activity.id}
                type={activity.action.includes('Created') ? 'create' : 
                      activity.action.includes('Updated') ? 'update' : 'download'}
                title={activity.resumeName}
                date={formatDate(activity.date)}
                action={activity.action}
              />
            ))}
          </div>
        </div>

        <div className={`${styles.card} ${styles.deadlineCard}`}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Upcoming Deadlines</h2>
            <ClickSpark>
              <button 
                className={styles.addButton} 
                onClick={handleAddDeadline}
              >
                <FiPlus size={18} /> Add
              </button>
            </ClickSpark>
          </div>
          <div className={styles.deadlineList}>
            {dashboardData?.upcomingDeadlines.map((deadline) => (
              <DeadlineItem 
                key={deadline.id}
                title={deadline.title}
                company={deadline.company}
                date={formatDate(deadline.date)}
                daysLeft={calculateDaysLeft(deadline.date)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
