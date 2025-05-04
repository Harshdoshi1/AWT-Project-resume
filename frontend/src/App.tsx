import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar"; // Ensure this import is correct
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import ResumeBuilder from "./pages/ResumeBuilder";
import ProfilePage from "./pages/ProfilePage";
import UploadResume from "./pages/UploadResume";
import TemplatePage from './pages/TemplatePage';
import PromptPage from './pages/PromptPage';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './contexts/AuthContext';
import { AuthProvider as AuthProviderHook } from './hooks/use-auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/ui/Footer'; // Correct import for default export
import ClickSparkProvider from './components/ClickSparkProvider'; // Import the ClickSparkProvider

const queryClient = new QueryClient();

function App() {
  return (
    <ClickSparkProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AuthProviderHook>
            <ThemeProvider defaultTheme="system" storageKey="resume-builder-theme">
              <BrowserRouter>
                <Navbar />
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/builder" element={<ResumeBuilder />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/upload" element={<UploadResume />} /> 
                  <Route path="/template" element={<TemplatePage />} />
                  <Route path="/prompt" element={<PromptPage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer /> {/* Ensure the Footer component is included here */}
              </BrowserRouter>
            </ThemeProvider>
          </AuthProviderHook>
        </AuthProvider>
      </QueryClientProvider>
    </ClickSparkProvider>
  );
}

export default App;