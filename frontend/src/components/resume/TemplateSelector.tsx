import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { TemplateType } from '@/types/template';

interface TemplateSelectorProps {
  templates: TemplateType[];
  selectedTemplate: TemplateType;
  onTemplateSelect: (template: TemplateType) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ templates, selectedTemplate, onTemplateSelect }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-white mb-4">Selected Template</h2>
      <div className="border border-[#4E9F3D]/50 rounded-lg p-4 bg-white/10">
        <div className="flex items-center gap-4">
          <div className="w-32 h-40 bg-white/20 rounded-md flex items-center justify-center overflow-hidden">
            {selectedTemplate.imageUrl ? (
              <img 
                src={selectedTemplate.imageUrl.replace('/public', '')} 
                alt={selectedTemplate.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.innerHTML = 
                    '<span className="text-white/50">No preview</span>';
                }}
              />
            ) : (
              <span className="text-white/50">No preview</span>
            )}
          </div>
          <div>
            <h3 className="text-white font-medium">{selectedTemplate.name}</h3>
            <p className="text-[#D8E9A8] text-sm mt-1">{selectedTemplate.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;