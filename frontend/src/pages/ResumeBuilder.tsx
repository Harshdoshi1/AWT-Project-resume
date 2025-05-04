import { useState, useEffect } from "react";
import type { Resume } from "@/services/resumeService";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import ResumeForm from "@/components/resume/ResumeForm";
import TemplateSelector from "@/components/resume/TemplateSelector";
import ModernTemplate from "@/components/resume/templates/ModernTemplate";
import ClassicTemplate from "@/components/resume/templates/ClassicTemplate";
import MinimalTemplate from "@/components/resume/templates/MinimalTemplate";
import type { ResumeData } from "@/types/resume";
import { TemplateType } from "../types/template";
import { resumeService } from "@/services/resumeService";
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader2 as Loader } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Minus, Plus, Download } from "lucide-react";

const initialResumeData: ResumeData = {
  fullName: "",
  email: "",
  summary: "",
  experience: [],
  education: [],
  skills: [],
  projects: [],
  contact: {
    phone: "",
    location: "",
    website: "",
    github: "",
    linkedin: "",
  },
  references: "",
};

const ResumeBuilder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Safely get selectedTemplate with null check
  const selectedTemplate = location.state?.selectedTemplate;
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [selectedTemplateState, setSelectedTemplateState] = useState<TemplateType | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [resumeTitle, setResumeTitle] = useState('');
  const [zoomLevel, setZoomLevel] = useState(0.9);
  const [selectedTemplateId, setSelectedTemplateId] = useState(selectedTemplateState?.id || 'modern');

  useEffect(() => {
    if (!selectedTemplate) {
      toast({
        title: "No template selected",
        description: "Please select a template first",
        variant: "destructive",
      });
      navigate('/template');
    } else {
      setSelectedTemplateState(selectedTemplate);
      setIsLoading(false);
    }
  }, [selectedTemplate, navigate, toast]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <Loader className="h-8 w-8 animate-spin" />
    </div>;
  }

  if (!selectedTemplateState) {
    return null; // Will redirect from useEffect
  }

  const handleUpdateResume = (newData: Partial<ResumeData>) => {
    setResumeData((prev) => ({ ...prev, ...newData }));
  };

  const convertToResumeData = (data: any): Omit<Resume, 'id' | 'userId'> => {
    return {
      title: resumeTitle || "Untitled Resume",
      content: {
        fullName: data?.basics?.name || '',
        email: data?.basics?.email || '',
        summary: data?.basics?.summary || '',
        experience: data?.work || [],
        education: data?.education || [],
        skills: data?.skills || [],
        projects: data?.projects || [],
        contact: {
          phone: data?.basics?.phone || '',
          location: data?.basics?.location || '',
          website: data?.basics?.website || '',
          github: data?.basics?.github || '',
          linkedin: data?.basics?.linkedin || ''
        },
        references: data?.basics?.references || ''
      }
    };
  };

  const handleSaveResume = async () => {
    if (!resumeData.fullName || !resumeData.email) {
      toast({
        title: "Error",
        description: "Please fill in at least your full name and email",
        variant: "destructive",
      });
      return;
    }
    
    setIsSaving(true);
    try {
      await resumeService.saveResume(
        convertToResumeData(resumeData),
        selectedTemplateState,
        {
          title: resumeTitle || "Untitled Resume",
          content: resumeData
        }
      );
      toast({
        title: "Success",
        description: "Resume saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save resume",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleTemplateChange = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplateState(template);
      setSelectedTemplateId(templateId);
    }
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 1.2));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.7));
  const handleZoomReset = () => setZoomLevel(0.9);

  const renderTemplate = () => {
    switch (selectedTemplateState.id) {
      case "modern":
        return <ModernTemplate data={resumeData} />;
      case "classic":
        return <ClassicTemplate data={resumeData} />;
      case "minimal":
        return <MinimalTemplate data={resumeData} />;
      default:
        return null; // Handle default case
    }
  };

  const templates: TemplateType[] = [
    {
      id: "modern",
      name: "Modern",
      description: "Clean and contemporary design with bold headers",
      imageUrl: "/images/modern-ats-resume-thumbnail.jpg",
      downloadUrl: "https://www.jobscan.co/resume-templates/modern-ats-resume",
      atsScore: 0,
    },
    {
      id: "classic",
      name: "Classic",
      description: "Traditional resume layout with a professional look",
      imageUrl: "/images/professional-ats-resume-thumbnail.jpg",
      downloadUrl: "https://create.microsoft.com/en-us/templates/professional-ats-resume",
      atsScore: 0,
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Simple and elegant design focusing on content",
      imageUrl: "/images/minimalist-ats-resume-thumbnail.jpg",
      downloadUrl: "https://resumeworded.com/resume-templates/minimalist-ats-resume",
      atsScore: 0,
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto py-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Form */}
        <Card className="p-6 h-fit">
          <h2 className="text-xl font-bold mb-4 pt-4">Your Profile</h2>
          <TemplateSelector
            templates={templates}
            selectedTemplate={selectedTemplateState}
            onTemplateSelect={(template: TemplateType) => setSelectedTemplateState(template)}
          />
          <ResumeForm data={resumeData} onUpdate={handleUpdateResume} />
          <div className="mb-4">
            <Label htmlFor="resumeTitle">Resume Title</Label>
            <Input
              id="resumeTitle"
              type="text"
              value={resumeTitle}
              onChange={(e) => setResumeTitle(e.target.value)}
            />
          </div>
          <Button 
            onClick={handleSaveResume}
            disabled={isSaving}
            className="w-full"
          >
            {isSaving ? 'Saving...' : 'Save Resume'}
          </Button>
        </Card>

        {/* Right Panel - Live Preview */}
        <div className="sticky top-4">
          <Card className="pt-10 px-6 pb-6 h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold pb-2 pr-2">Live Preview</h2>
              <div className="flex gap-2 pr-2">
                <Select value={selectedTemplateId} onValueChange={handleTemplateChange}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="classic">Classic</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" onClick={handleZoomOut}>
                  <Minus className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleZoomReset}>
                  <span className="text-xs">{Math.round(zoomLevel * 100)}%</span>
                </Button>
                <Button variant="outline" size="icon" onClick={handleZoomIn}>
                  <Plus className="h-4 w-4" />
                </Button>
                <Button onClick={() => console.log('Download PDF')}>
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </Button>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-lg overflow-auto resume-preview-container">
              {selectedTemplateState && (
                <div style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top' }} className="print:scale-100 print:transform-none">
                  {selectedTemplateState.id === 'modern' && <ModernTemplate data={resumeData} />}
                  {selectedTemplateState.id === 'classic' && <ClassicTemplate data={resumeData} />}
                  {selectedTemplateState.id === 'minimal' && <MinimalTemplate data={resumeData} />}
                </div>
              )}
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>Changes update in real-time as you edit</p>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default ResumeBuilder;
