import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect } from 'react';

const Navbar = () => {
  const { user } = useAuth();

  useEffect(() => {
    console.log('Navbar user state:', user);
    console.log('LocalStorage user:', localStorage.getItem('user'));
  }, [user]);

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-xl font-bold text-white">
            SkillFit
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/dashboard" className="text-white hover:text-gray-300 mr-5 border-b-2 border-[#4E9F3D]">
                  Dashboard
                </Link>
                <Link to="/upload" className="text-white hover:text-gray-300 mr-5">
                  Upload
                </Link>
                <Link to="/profile" className="text-white hover:text-gray-300">
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-gray-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-purple-600 px-4 py-2 rounded-md hover:bg-gray-100"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;