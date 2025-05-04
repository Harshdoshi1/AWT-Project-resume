import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Link2, Globe, Github, Linkedin } from "lucide-react";

interface ResumePreviewProps {
  data: {
    fullName: string;
    email: string;
    summary: string;
    experience: Array<{
      title: string;
      company: string;
      duration: string;
      description: string;
    }>;
    education: Array<{
      degree: string;
      institution: string;
      year: string;
    }>;
    skills: string[];
    projects: Array<{
      name: string;
      description: string;
      link: string;
      duration: string;
    }>;
    contact: {
      phone: string;
      location: string;
      website: string;
      github: string;
      linkedin: string;
    };
    references: string;
  };
}

const ResumePreview = ({ data }: ResumePreviewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg min-h-[297mm] w-full"
    >
      {/* Header */}
      <div className="text-center mb-6 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {data.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-300">
          {data.contact?.location && (
            <span className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {data.contact.location}
            </span>
          )}
          {data.contact?.phone && (
            <span className="flex items-center">
              <Phone className="w-4 h-4 mr-1" />
              {data.contact.phone}
            </span>
          )}
          {data.email && (
            <span className="flex items-center">
              <Mail className="w-4 h-4 mr-1" />
              {data.email}
            </span>
          )}
          {data.contact?.website && (
            <span className="flex items-center">
              <Globe className="w-4 h-4 mr-1" />
              <a href={data.contact.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                Website
              </a>
            </span>
          )}
          {data.contact?.github && (
            <span className="flex items-center">
              <Github className="w-4 h-4 mr-1" />
              <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                GitHub
              </a>
            </span>
          )}
          {data.contact?.linkedin && (
            <span className="flex items-center">
              <Linkedin className="w-4 h-4 mr-1" />
              <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                LinkedIn
              </a>
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white border-b pb-1">
            SUMMARY
          </h2>
          <div 
            className="text-gray-700 dark:text-gray-300 prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: data.summary }}
          />
        </div>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white border-b pb-1">
            EXPERIENCE
          </h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                  {exp.company}
                </h3>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  {exp.duration}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic">
                {exp.title}
              </p>
              <div 
                className="text-gray-600 dark:text-gray-400 text-sm mt-1 prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: exp.description }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white border-b pb-1">
            EDUCATION
          </h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                  {edu.institution}
                </h3>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  {edu.year}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{edu.degree}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white border-b pb-1">
            SKILLS
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-700 dark:text-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white border-b pb-1">
            PROJECTS
          </h2>
          {data.projects.map((project, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                  {project.name}
                </h3>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  {project.duration}
                </span>
              </div>
              <div 
                className="text-gray-600 dark:text-gray-400 text-sm prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 text-sm flex items-center mt-1"
                >
                  <Link2 className="w-3 h-3 mr-1" />
                  Project Link
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* References */}
      {data.references && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white border-b pb-1">
            REFERENCES
          </h2>
          <div 
            className="text-gray-600 dark:text-gray-400 text-sm prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: data.references }}
          />
        </div>
      )}
    </motion.div>
  );
};

export default ResumePreview;