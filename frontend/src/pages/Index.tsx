import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Aurora from '../components/ui/Aurora';
import { useRef } from 'react';

const Index = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen pt-16 overflow-auto" ref={scrollContainerRef}>
      <div>
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.8}
      />
      {/* Other components and content */}
    </div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeIn">
              One Resume,
              <br />
              <span className="text-primary">Infinite Possibilities</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fadeIn">
              Create tailored resumes for different roles instantly. Our AI-powered
              platform adapts your experience to match any job profile.
            </p>
            <div className="space-x-4 animate-fadeIn">
              <Link to="/signup">
                <Button size="lg" className="px-8">
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="px-8">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10" />
          <div
            className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%]"
            style={{
              background:
                "radial-gradient(circle at center, rgba(var(--primary), 0.1) 0%, transparent 70%)",
            }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Customization",
                description:
                  "Our AI automatically tailors your resume for specific job roles and companies.",
              },
              {
                title: "Multiple Formats",
                description:
                  "Export your resume in various formats including PDF, Word, and ATS-friendly versions.",
              },
              {
                title: "Real-time Preview",
                description:
                  "See changes instantly as you customize your resume for different positions.",
              },
            ].map((feature, index) => (
              <div key={`feature-${index}`} className="glass p-6 rounded-lg" style={{ animationDelay: `${index * 200}ms` }}>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;