import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import HyperspeedBg from "../components/HyperspeedBg";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

/**
 * Login component for user authentication
 * @returns {JSX.Element} Login form component
 */
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  /**
   * Handle form submission for user login
   * @param {React.FormEvent} e - Form event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      <HyperspeedBg />
      <main className="flex-1 relative z-10">
        <div className="container py-14 md:py-24">
          <div className="mx-auto w-full max-w-[550px] px-5">
            <div className="bg-card/10 backdrop-blur-lg p-8 shadow-lg rounded-xl border border-border/30 border-opacity-50 ring-1 ring-white/10 w-full">
              <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-foreground whitespace-nowrap mb-4">
                  Sign in to your account
                </h1>
                {error && <div className="mt-4 text-red-500">{error}</div>}
              </div>

              <form className="space-y-8" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-base font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    className="w-full px-4 py-3 text-base border border-border rounded-lg bg-input text-foreground"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-foreground mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      className="w-full px-4 py-3 text-base border border-border rounded-lg bg-input text-foreground"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-[#4E9F3D] hover:text-[#B4BDFF]"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 text-base bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </form>

              <div className="mt-8 text-center">
                <Link 
                  to="/signup" 
                  className="text-base text-muted-foreground hover:text-foreground transition-colors"
                >
                  Don't have an account? Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}