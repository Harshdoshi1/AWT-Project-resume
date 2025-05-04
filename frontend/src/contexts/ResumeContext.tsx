import { createContext, useContext, useState, ReactNode } from 'react';

type Resume = {
  id: string;
  name: string;
  filePath?: string;
};

type ResumeContextType = {
  resumes: Resume[];
  addResume: (resume: Resume) => void;
};

const ResumeContext = createContext<ResumeContextType>({
  resumes: [],
  addResume: () => {},
});

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumes, setResumes] = useState<Resume[]>([]);

  const addResume = (resume: Resume) => {
    setResumes((prev) => [...prev, resume]);
  };

  return (
    <ResumeContext.Provider value={{ resumes, addResume }}>
      {children}
    </ResumeContext.Provider>
  );
}

export const useResumes = () => useContext(ResumeContext);
