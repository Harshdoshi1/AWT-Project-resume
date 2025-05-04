import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import RichTextEditor from "@/components/ui/rich-text-editor";

interface ExperienceProps {
  data: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  onUpdate: (data: any) => void;
}

const Experience = ({ data, onUpdate }: ExperienceProps) => {
  const addExperience = () => {
    const newExperience = {
      title: "",
      company: "",
      duration: "",
      description: "",
    };
    onUpdate({ experience: [...data, newExperience] });
  };

  const removeExperience = (index: number) => {
    const newExperience = [...data];
    newExperience.splice(index, 1);
    onUpdate({ experience: newExperience });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Experience</h2>
        <Button
          onClick={addExperience}
          variant="outline"
          size="sm"
          className="bg-white/20 border-none text-white hover:bg-white/30"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Experience
        </Button>
      </div>
      {data.map((exp, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4 p-6 rounded-lg bg-white/5 relative"
        >
          <Button
            onClick={() => removeExperience(index)}
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 text-white hover:bg-white/10"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          <Input
            value={exp.title}
            onChange={(e) => {
              const newExp = [...data];
              newExp[index].title = e.target.value;
              onUpdate({ experience: newExp });
            }}
            className="bg-white/20 border-none text-white placeholder:text-white/50"
            placeholder="Job Title"
          />
          <Input
            value={exp.company}
            onChange={(e) => {
              const newExp = [...data];
              newExp[index].company = e.target.value;
              onUpdate({ experience: newExp });
            }}
            className="bg-white/20 border-none text-white placeholder:text-white/50"
            placeholder="Company"
          />
          <Input
            value={exp.duration}
            onChange={(e) => {
              const newExp = [...data];
              newExp[index].duration = e.target.value;
              onUpdate({ experience: newExp });
            }}
            className="bg-white/20 border-none text-white placeholder:text-white/50"
            placeholder="Duration (e.g., Jan 2020 - Present)"
          />
          <RichTextEditor
            value={exp.description}
            onChange={(value) => {
              const newExp = [...data];
              newExp[index].description = value;
              onUpdate({ experience: newExp });
            }}
            placeholder="Job Description"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default Experience;