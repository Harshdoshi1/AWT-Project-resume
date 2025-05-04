import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import RichTextEditor from "@/components/ui/rich-text-editor";

interface ProjectsProps {
  data: Array<{
    name: string;
    description: string;
    link: string;
    duration: string;
  }>;
  onUpdate: (data: any) => void;
}

const Projects = ({ data, onUpdate }: ProjectsProps) => {
  const addProject = () => {
    const newProject = {
      name: "",
      description: "",
      link: "",
      duration: "",
    };
    onUpdate({ projects: [...data, newProject] });
  };

  const removeProject = (index: number) => {
    const newProjects = [...data];
    newProjects.splice(index, 1);
    onUpdate({ projects: newProjects });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Projects</h2>
        <Button
          onClick={addProject}
          variant="outline"
          size="sm"
          className="bg-white/20 border-none text-white hover:bg-white/30"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Project
        </Button>
      </div>
      {data.map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4 p-6 rounded-lg bg-white/5 relative"
        >
          <Button
            onClick={() => removeProject(index)}
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 text-white hover:bg-white/10"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          <Input
            value={project.name}
            onChange={(e) => {
              const newProjects = [...data];
              newProjects[index].name = e.target.value;
              onUpdate({ projects: newProjects });
            }}
            className="bg-white/20 border-none text-white placeholder:text-white/50"
            placeholder="Project Name"
          />
          <Input
            value={project.duration}
            onChange={(e) => {
              const newProjects = [...data];
              newProjects[index].duration = e.target.value;
              onUpdate({ projects: newProjects });
            }}
            className="bg-white/20 border-none text-white placeholder:text-white/50"
            placeholder="Duration (e.g., Jan 2020 - Mar 2020)"
          />
          <RichTextEditor
            value={project.description}
            onChange={(value) => {
              const newProjects = [...data];
              newProjects[index].description = value;
              onUpdate({ projects: newProjects });
            }}
            placeholder="Project Description"
          />
          <Input
            value={project.link}
            onChange={(e) => {
              const newProjects = [...data];
              newProjects[index].link = e.target.value;
              onUpdate({ projects: newProjects });
            }}
            className="bg-white/20 border-none text-white placeholder:text-white/50"
            placeholder="Project Link"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default Projects;