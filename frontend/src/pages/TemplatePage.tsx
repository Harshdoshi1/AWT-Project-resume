import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import ClickSpark from '../components/ClickSpark';
import { useNavigate } from 'react-router-dom';
import { TemplateType } from '../types/template';

// Sample data for ATS-friendly resume templates
const templates: TemplateType[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design with bold headers',
    imageUrl: '/images/modern-ats-resume-thumbnail.jpg',
    downloadUrl: 'https://www.jobscan.co/resume-templates/modern-ats-resume',
    atsScore: 90
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional resume layout with a professional look',
    imageUrl: '/images/professional-ats-resume-thumbnail.jpg',
    downloadUrl: 'https://create.microsoft.com/en-us/templates/professional-ats-resume',
    atsScore: 85
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant design focusing on content',
    imageUrl: '/images/minimalist-ats-resume-thumbnail.jpg',
    downloadUrl: 'https://resumeworded.com/resume-templates/minimalist-ats-resume',
    atsScore: 80
  },
  {
    id: 'uploaded',
    name: 'ATS Stylish Accounting Resume',
    description: 'Custom resume template you uploaded',
    imageUrl: '/resumes/thumbnail/ATS stylish accounting resume.png',
    filePath: '/resumes/ATS stylish accounting resume.pdf',
    downloadUrl: '',
    atsScore: 80
  }
];

export default function TemplatePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleTemplateSelect = (template: TemplateType) => {
    navigate('/prompt', { state: { selectedTemplate: template } });
  };

  return (
    <div className="min-h-screen bg-background p-6 pt-[40px]">
      <div className="text-center my-8">
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <CardContent>
                <img
                  src={template.imageUrl}
                  alt={`Thumbnail of ${template.name}`}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <div className="flex justify-between items-center mb-2">
                  <div className="text-card-foreground font-semibold">{template.name}</div>
                  <div className="bg-[#4E9F3D] text-white text-xs px-2 py-1 rounded">
                    ATS: {template.atsScore}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mb-4">{template.description}</div>
                <div className="flex gap-2">
                  {template.filePath && (
                    <ClickSpark>
                      <a
                        href={template.filePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-secondary text-secondary-foreground px-4 py-2 rounded hover:bg-secondary/80 transition-colors inline-block text-center w-full cursor-pointer"
                      >
                        Preview
                      </a>
                    </ClickSpark>
                  )}
                  <ClickSpark>
                    <a
                      onClick={() => handleTemplateSelect(template)}
                      className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors inline-block text-center w-full cursor-pointer"
                    >
                      Select Template
                    </a>
                  </ClickSpark>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
