export interface ResumeData {
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
}