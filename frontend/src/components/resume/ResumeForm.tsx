import { motion } from "framer-motion";
import PersonalInfo from "./sections/PersonalInfo";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import RichTextEditor from "@/components/ui/rich-text-editor";
import { Label } from "@/components/ui/label";

interface ResumeFormProps {
  data: any;
  onUpdate: (data: any) => void;
}

const ResumeForm = ({ data, onUpdate }: ResumeFormProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <PersonalInfo data={data} onUpdate={onUpdate} />
      <Experience data={data.experience} onUpdate={onUpdate} />
      <Education data={data.education} onUpdate={onUpdate} />
      <Skills data={data.skills} onUpdate={onUpdate} />
      <Projects data={data.projects} onUpdate={onUpdate} />
      
      <div className="space-y-2">
        <Label htmlFor="references" className="text-white">References</Label>
        <RichTextEditor
          value={data.references}
          onChange={(value) => onUpdate({ references: value })}
          placeholder="Enter your references..."
        />
      </div>
    </motion.div>
  );
};

export default ResumeForm;