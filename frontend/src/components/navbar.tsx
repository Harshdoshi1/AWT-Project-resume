import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ClickSpark from './ClickSpark';
import { Menu, X, User } from "lucide-react";
import { useTheme } from "./theme-provider";
import { useAuth } from "@/contexts/AuthContext";
import { UnderlineButton } from './ui/UnderlineButton';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {user ? (
              <NavLink to="/dashboard" className="text-xl font-bold">
                Skill Fit Resume
              </NavLink>
            ) : (
              <NavLink to="/" className="text-xl font-bold">
                Skill Fit Resume
              </NavLink>
            )}
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <ClickSpark colors={['#4E9F3D', '#B4BDFF', '#D8E9A8']}>
                {!user ? (
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? `font-medium relative py-2 ${theme === 'light' ? 'text-foreground' : 'text-white'} after:absolute after:bg-primary after:h-0.5 after:w-full after:left-0 after:bottom-0`
                        : "relative font-medium transition-colors duration-300 py-2 after:absolute after:bg-primary after:h-0.5 after:w-0 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full px-3"
                    }
                  >
                    Home
                  </NavLink>
                ) : (
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? `font-medium relative py-2 ${theme === 'light' ? 'text-foreground' : 'text-white'} after:absolute after:bg-primary after:h-0.5 after:w-full after:left-0 after:bottom-0`
                        : "relative font-medium transition-colors duration-300 py-2 after:absolute after:bg-primary after:h-0.5 after:w-0 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full px-3"
                    }
                  >
                    Dashboard
                  </NavLink>
                )}
              </ClickSpark>
              {!user ? (
                <>
                  <ClickSpark colors={['#4E9F3D', '#B4BDFF', '#D8E9A8']}>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        isActive
                          ? `font-medium relative py-2 ${theme === 'light' ? 'text-foreground' : 'text-white'} after:absolute after:bg-primary after:h-0.5 after:w-full after:left-0 after:bottom-0`
                          : "relative font-medium transition-colors duration-300 py-2 after:absolute after:bg-primary after:h-0.5 after:w-0 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full px-3"
                      }
                    >
                      Login
                    </NavLink>
                  </ClickSpark>
                  <ClickSpark colors={['#4E9F3D', '#B4BDFF', '#D8E9A8']}>
                    <NavLink
                      to="/signup"
                      className={({ isActive }) =>
                        isActive
                          ? `font-medium relative py-2 ${theme === 'light' ? 'text-foreground' : 'text-white'} after:absolute after:bg-primary after:h-0.5 after:w-full after:left-0 after:bottom-0`
                          : "relative font-medium transition-colors duration-300 py-2 after:absolute after:bg-primary after:h-0.5 after:w-0 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full px-3"
                      }
                    >
                      Sign Up
                    </NavLink>
                  </ClickSpark>
                </>
              ) : (
                <>
                  <ClickSpark colors={['#4E9F3D', '#B4BDFF', '#D8E9A8']}>
                    <button 
                      onClick={() => navigate('/builder')}
                      className="relative font-medium transition-colors duration-300 py-2 after:absolute after:bg-primary after:h-0.5 after:w-0 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full px-3"
                    >
                      Templates
                    </button>
                  </ClickSpark>
                  <ClickSpark colors={['#4E9F3D', '#B4BDFF', '#D8E9A8']}>
                    <button 
                      onClick={() => navigate('/upload')}
                      className="relative font-medium transition-colors duration-300 py-2 after:absolute after:bg-primary after:h-0.5 after:w-0 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full px-3"
                    >
                      Upload Resume
                    </button>
                  </ClickSpark>
                  <ClickSpark colors={['#4E9F3D', '#B4BDFF', '#D8E9A8']}>
                    <NavLink
                      to="/profile"
                      className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors duration-200 flex items-center justify-center"
                    >
                      <User className="h-8 w-8 text-gray-800 dark:text-gray-200" />
                    </NavLink>
                  </ClickSpark>
                </>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <ClickSpark>
              <UnderlineButton onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </UnderlineButton>
            </ClickSpark>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <ClickSpark colors={['#4E9F3D', '#B4BDFF', '#D8E9A8']}>
                {!user ? (
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? `block font-medium relative py-2 ${theme === 'light' ? 'text-foreground' : 'text-white'} after:absolute after:bg-primary after:h-0.5 after:w-full after:left-0 after:bottom-0`
                        : "block relative font-medium transition-colors duration-300 py-2 after:absolute after:bg-primary after:h-0.5 after:w-0 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full px-3"
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </NavLink>
                ) : (
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? `block font-medium relative py-2 ${theme === 'light' ? 'text-foreground' : 'text-white'} after:absolute after:bg-primary after:h-0.5 after:w-full after:left-0 after:bottom-0`
                        : "block relative font-medium transition-colors duration-300 py-2 after:absolute after:bg-primary after:h-0.5 after:w-0 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full px-3"
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                )}
              </ClickSpark>
              {!user ? (
                <>
                  <ClickSpark colors={['#4E9F3D', '#B4BDFF', '#D8E9A8']}>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        isActive
                          ? `block font-medium relative py-2 ${theme === 'light' ? 'text-foreground' : 'text-white'} after:absolute after:bg-primary after:h-0.5 after:w-full after:left-0 after:bottom-0`
                          : "block relative font-medium transition-colors duration-300 py-2 after:absolute after:bg-primary after:h-0.5 after:w-0 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full px-3"
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </NavLink>
                  </ClickSpark>
                  <ClickSpark colors={['#4E9F3D', '#B4BDFF', '#D8E9A8']}>
                    <NavLink
                      to="/signup"
                      className={({ isActive }) =>
                        isActive
                          ? `block font-medium relative py-2 ${theme === 'light' ? 'text-foreground' : 'text-white'} after:absolute after:bg-primary after:h-0.5 after:w-full after:left-0 after:bottom-0`
                          : "block relative font-medium transition-colors duration-300 py-2 after:absolute after:bg-primary after:h-0.5 after:w-0 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full px-3"
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Up
                    </NavLink>
                  </ClickSpark>
                </>
              ) : (
                <>
                  <ClickSpark colors={['#4E9F3D', '#B4BDFF', '#D8E9A8']}>
                    <button 
                      onClick={() => navigate('/builder')}
                      className="block relative font-medium transition-colors duration-300 py-2 after:absolute after:bg-primary after:h-0.5 after:w-0 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full px-3"
                    >
                      Templates
                    </button>
                  </ClickSpark>
                  <ClickSpark colors={['#4E9F3D', '#B4BDFF', '#D8E9A8']}>
                    <button 
                      onClick={() => navigate('/upload')}
                      className="block relative font-medium transition-colors duration-300 py-2 after:absolute after:bg-primary after:h-0.5 after:w-0 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full px-3"
                    >
                      Upload Resume
                    </button>
                  </ClickSpark>
                  <ClickSpark colors={['#4E9F3D', '#B4BDFF', '#D8E9A8']}>
                    <NavLink
                      to="/profile"
                      className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors duration-200 flex items-center justify-center"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="h-8 w-8 text-gray-800 dark:text-gray-200" />
                    </NavLink>
                  </ClickSpark>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}