import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface SkillsProps {
  data: string[];
  onUpdate: (data: any) => void;
}

const Skills = ({ data, onUpdate }: SkillsProps) => {
  const addSkill = () => {
    onUpdate({ skills: [...data, ""] });
  };

  const removeSkill = (index: number) => {
    const newSkills = [...data];
    newSkills.splice(index, 1);
    onUpdate({ skills: newSkills });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Skills</h2>
        <Button
          onClick={addSkill}
          variant="outline"
          size="sm"
          className="bg-white/20 border-none text-white hover:bg-white/30"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Skill
        </Button>
      </div>
      {data.map((skill, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-2"
        >
          <Input
            value={skill}
            onChange={(e) => {
              const newSkills = [...data];
              newSkills[index] = e.target.value;
              onUpdate({ skills: newSkills });
            }}
            className="bg-white/20 border-none text-white placeholder:text-white/50"
            placeholder="Enter a skill"
          />
          <Button
            onClick={() => removeSkill(index)}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </motion.div>
      ))}
    </div>
  );
};

export default Skills;