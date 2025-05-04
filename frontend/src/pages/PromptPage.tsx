import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useResumes } from '@/contexts/ResumeContext';
import ClickSpark from '@/components/ClickSpark';
import { motion, AnimatePresence } from 'framer-motion';

export default function PromptPage() {
  const [prompt, setPrompt] = useState('');
  const [selectedResume, setSelectedResume] = useState('');
  const [selectedResumeData, setSelectedResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { resumes } = useResumes();
  const location = useLocation();

  const dummyResumes = [
    {
      id: 'dummy1',
      name: 'Software Engineer Template',
      description: 'Professional template for software engineers',
      image: '/images/dummy1.png'
    },
    {
      id: 'dummy2',
      name: 'Product Manager Template',
      description: 'Template optimized for product managers',
      image: '/images/dummy2.png'
    },
    {
      id: 'dummy3',
      name: 'UX Designer Template',
      description: 'Modern template for UX professionals',
      image: '/images/dummy3.png'
    }
  ];

  useEffect(() => {
    if (location.state?.selectedTemplate) {
      setSelectedResume(location.state.selectedTemplate.id);
      setSelectedResumeData(location.state.selectedTemplate);
    }
  }, [location.state]);

  useEffect(() => {
    if (selectedResume && !selectedResumeData) {
      const resume = resumes.find(r => r.id === selectedResume);
      setSelectedResumeData(resume || null);
    }
  }, [selectedResume, resumes, selectedResumeData]);

  const loadingSteps = [
    { text: "Analyzing resume structure...", duration: 1.5, emoji: "🔍" },
    { text: "Extracting key skills...", duration: 1.8, emoji: "📝" },
    { text: "Processing your prompt...", duration: 2.2, emoji: "💡" },
    { text: "Generating tailored content...", duration: 2.5, emoji: "✨" },
    { text: "Optimizing for ATS...", duration: 1.7, emoji: "📊" },
    { text: "Finalizing your resume...", duration: 1.5, emoji: "✅" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedResumeData) {
      // If no template selected, redirect to template page
      navigate('/template');
      return;
    }

    // If creating manually, pass the template data
    navigate('/builder', { 
      state: { 
        selectedTemplate: selectedResumeData 
      } 
    });
  };

  const LoadingAnimation = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
    >
      <div className="w-full max-w-md px-6">
        <div className="relative h-3 w-full bg-gray-700 rounded-full mb-8 overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#4E9F3D] to-[#B4BDFF]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 border-4 border-[#4E9F3D] border-t-[#B4BDFF] rounded-full animate-spin" />
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <p className="text-white text-3xl mb-4">{loadingSteps[currentStep].emoji}</p>
            <p className="text-white text-xl font-medium mb-2">
              {loadingSteps[currentStep].text}
            </p>
            <p className="text-[#D8E9A8]">
              Step {currentStep + 1} of {loadingSteps.length} • {Math.round(progress)}% complete
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] p-4 relative">
      <AnimatePresence>
        {isLoading && <LoadingAnimation />}
      </AnimatePresence>
      
      <div className={`max-w-4xl mx-auto transition-opacity ${isLoading ? 'opacity-30' : 'opacity-100'}`}>
        <Card className="mt-10">
          <CardContent className="p-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-white">
              Enter Your Prompt
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-white block text-sm font-medium">
                    Select Resume Template
                  </label>
                  <Select 
                    onValueChange={setSelectedResume}
                    disabled={isLoading}
                    value={selectedResume}
                  >
                    <SelectTrigger className="w-full bg-white text-black">
                      <SelectValue placeholder="Select a resume template" />
                    </SelectTrigger>
                    <SelectContent>
                      {resumes.map((resume) => (
                        <SelectItem key={resume.id} value={resume.id}>
                          {resume.name}
                        </SelectItem>
                      ))}
                      {dummyResumes.map((resume) => (
                        <SelectItem key={resume.id} value={resume.id}>
                          {resume.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedResumeData && (
                  <div className="mt-4 p-4 border border-[#4E9F3D]/50 rounded-lg bg-white/10">
                    <h3 className="text-white font-medium mb-2">Selected Template:</h3>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-32 bg-white/20 rounded-md flex items-center justify-center">
                        {selectedResumeData.image ? (
                          <img 
                            src={selectedResumeData.image} 
                            alt={selectedResumeData.name}
                            className="w-full h-full object-cover rounded-md"
                          />
                        ) : (
                          <span className="text-white/50">Preview</span>
                        )}
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{selectedResumeData.name}</h4>
                        <p className="text-[#D8E9A8] text-sm mt-1">
                          {selectedResumeData.description || 'Professional resume template'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-white block text-sm font-medium">
                  Customization Prompt
                </label>
                <textarea
                  rows={5}
                  placeholder="Describe your dream job or paste a job description..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full p-4 border border-[#4E9F3D] rounded-lg focus-visible:ring-2 focus-visible:ring-[#B4BDFF] focus:outline-none text-black"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="flex justify-center gap-4">
                <ClickSpark sparkCount={12} animationDuration={600}>
                  <Button 
                    type="button"
                    onClick={() => navigate('/builder', { state: { selectedTemplate: selectedResumeData } })}
                    className="bg-[#B4BDFF] hover:bg-[#9da6e6] text-[#191A19] px-8 py-4 text-lg"
                    disabled={!selectedResumeData}
                  >
                    Create Manually
                  </Button>
                </ClickSpark>
                <ClickSpark sparkCount={12} animationDuration={600}>
                  <Button 
                    type="submit" 
                    className="bg-[#4E9F3D] hover:bg-[#3e7e32] text-[#D8E9A8] px-8 py-4 text-lg"
                    disabled={isLoading || !prompt || !selectedResume}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-pulse">Generating...</span>
                      </span>
                    ) : 'Generate Resume'}
                  </Button>
                </ClickSpark>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}