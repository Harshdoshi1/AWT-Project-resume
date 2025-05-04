import { ResumeData } from "@/types/resume";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Link2, Globe, Github, Linkedin } from "lucide-react";

interface ModernTemplateProps {
  data: ResumeData;
}

const ModernTemplate = ({ data }: ModernTemplateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg min-h-[297mm] w-full"
    >
      <div className="border-l-4 border-primary pl-4 mb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {data.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600 dark:text-gray-300">
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
        </div>
        <div className="flex flex-wrap gap-4 mt-2 text-sm">
          {data.contact?.website && (
            <a
              href={data.contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-primary hover:text-primary/80"
            >
              <Globe className="w-4 h-4 mr-1" />
              Website
            </a>
          )}
          {data.contact?.github && (
            <a
              href={data.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-primary hover:text-primary/80"
            >
              <Github className="w-4 h-4 mr-1" />
              GitHub
            </a>
          )}
          {data.contact?.linkedin && (
            <a
              href={data.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-primary hover:text-primary/80"
            >
              <Linkedin className="w-4 h-4 mr-1" />
              LinkedIn
            </a>
          )}
        </div>
      </div>

      {/* Rest of the sections */}
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

export default ModernTemplate;
