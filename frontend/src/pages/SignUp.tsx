import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import HyperspeedBg from "../components/HyperspeedBg";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { insertRecord } from '../services/databaseService';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } }
      });
      
      if (authError) throw authError;
      
      if (authData.user) {
        await insertRecord('profiles', {
          id: authData.user.id,
          email,
          full_name: fullName,
          created_at: new Date().toISOString()
        });
      }
      
      navigate('/verify-email');
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
                  Create a new account
                </h1>
                {error && (
                  <div className="mt-4 text-red-500">{error}</div>
                )}
              </div>

              <form className="space-y-8" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-base font-medium text-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg bg-[#f8f9fa] text-gray-900"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg bg-[#f8f9fa] text-gray-900"
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
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg bg-[#f8f9fa] text-gray-900"
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
                  {loading ? 'Creating account...' : 'Sign up'}
                </button>
              </form>

              <div className="mt-8 text-center">
                <Link 
                  to="/login" 
                  className="text-base text-muted-foreground hover:text-foreground transition-colors"
                >
                  Already have an account? Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
