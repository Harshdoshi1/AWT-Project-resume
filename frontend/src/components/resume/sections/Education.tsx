import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface EducationProps {
  data: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  onUpdate: (data: any) => void;
}

const Education = ({ data, onUpdate }: EducationProps) => {
  const addEducation = () => {
    const newEducation = {
      degree: "",
      institution: "",
      year: "",
    };
    onUpdate({ education: [...data, newEducation] });
  };

  const removeEducation = (index: number) => {
    const newEducation = [...data];
    newEducation.splice(index, 1);
    onUpdate({ education: newEducation });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Education</h2>
        <Button
          onClick={addEducation}
          variant="outline"
          size="sm"
          className="bg-white/20 border-none text-white hover:bg-white/30"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Education
        </Button>
      </div>
      {data.map((edu, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4 p-6 rounded-lg bg-white/5 relative"
        >
          <Button
            onClick={() => removeEducation(index)}
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 text-white hover:bg-white/10"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          <Input
            value={edu.degree}
            onChange={(e) => {
              const newEdu = [...data];
              newEdu[index].degree = e.target.value;
              onUpdate({ education: newEdu });
            }}
            className="bg-white/20 border-none text-white placeholder:text-white/50"
            placeholder="Degree"
          />
          <Input
            value={edu.institution}
            onChange={(e) => {
              const newEdu = [...data];
              newEdu[index].institution = e.target.value;
              onUpdate({ education: newEdu });
            }}
            className="bg-white/20 border-none text-white placeholder:text-white/50"
            placeholder="Institution"
          />
          <Input
            value={edu.year}
            onChange={(e) => {
              const newEdu = [...data];
              newEdu[index].year = e.target.value;
              onUpdate({ education: newEdu });
            }}
            className="bg-white/20 border-none text-white placeholder:text-white/50"
            placeholder="Year"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default Education;