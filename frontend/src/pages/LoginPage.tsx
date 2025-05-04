import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function LoginPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async () => {
    // 添加实际登录逻辑
    navigate(location.state?.from || '/');
  };

  if (user) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Sign in with Email
        </button>
      </div>
    </div>
  );
};
