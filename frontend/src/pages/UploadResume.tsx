import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Upload, FileUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useResumes } from "@/contexts/ResumeContext";
import ClickSpark from "@/components/ClickSpark";

const UploadResume = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { resumes, addResume } = useResumes();
  const [selectedResume, setSelectedResume] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const dummyResumes = [
    {
      id: 'dummy1',
      name: 'Software Engineer Template'
    },
    {
      id: 'dummy2',
      name: 'Product Manager Template'
    },
    {
      id: 'dummy3',
      name: 'UX Designer Template'
    }
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const validateFileType = (file: File) => {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or Word document (.pdf, .doc, .docx)",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      if (validateFileType(files[0])) {
        handleFileUpload(files[0]);
      }
    }
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    toast({
      title: "Resume uploaded",
      description: `${file.name} has been successfully uploaded.`,
    });
  };

  const handleGoogleDriveUpload = () => {
    window.open('https://drive.google.com', '_blank');
  };

  const handleNext = () => {
    if (selectedResume || isUploaded) {
      navigate("/builder");
    } else {
      toast({
        title: "Error",
        description: "Please select or upload a resume first",
        variant: "destructive",
      });
    }
  };

  const handleUploadToDatabase = async () => {
    if (!uploadedFile) return;
    
    try {
      setIsUploading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      addResume({
        id: Date.now().toString(),
        name: uploadedFile.name,
        filePath: `/resumes/${uploadedFile.name}`
      });
      
      setIsUploaded(true);
      toast({
        title: "Success",
        description: "Resume saved to database successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save resume to database",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 bg-gradient-to-br from-russian-violet to-french-violet dark:from-prussian-blue dark:to-rich-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="p-8 backdrop-blur-lg bg-white/10 dark:bg-black/10 border-none shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <BookOpen className="w-32 h-32 mx-auto md:mx-0 text-white mb-6" />
              <h1 className="text-3xl font-bold text-white mb-4">Upload Resume</h1>
              <p className="text-gray-300 mb-6">
                Upload your resume or select from previously uploaded ones
              </p>
            </div>

            <div className="flex-1 w-full">
              <div className="mb-6">
                <Select onValueChange={setSelectedResume} value={selectedResume}>
                  <SelectTrigger className="w-full bg-white/20 border-none text-white">
                    <SelectValue placeholder="Select previous resume" />
                  </SelectTrigger>
                  <SelectContent>
                    {resumes.map((resume) => (
                      <SelectItem key={resume.id} value={resume.id}>
                        {resume.name}
                      </SelectItem>
                    ))}
                    {dummyResumes.map((resume) => (
                      <SelectItem key={resume.id} value={resume.id}>
                        {resume.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragging
                    ? "border-primary bg-primary/20"
                    : "border-white/20 hover:border-white/40"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 mx-auto text-white mb-4" />
                {uploadedFile ? (
                  <div className="text-white">
                    <p className="font-medium">{uploadedFile.name}</p>
                    <ClickSpark>
                      <button
                        onClick={() => setUploadedFile(null)}
                        className="text-sm text-primary hover:underline mt-2"
                      >
                        Remove file
                      </button>
                    </ClickSpark>
                  </div>
                ) : (
                  <>
                    <p className="text-white mb-2">
                      Drag and drop your resume here, or
                    </p>
                    <ClickSpark>
                      <Button variant="outline" className="mt-2" onClick={() => document.getElementById('fileInput')?.click()}>
                        <FileUp className="w-4 h-4 mr-2" />
                        Choose File
                      </Button>
                    </ClickSpark>
                    <input
                      id="fileInput"
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file && validateFileType(file)) {
                          handleFileUpload(file);
                        }
                      }}
                    />
                  </>
                )}
              </div>
              
              <div className="flex justify-between mt-6">
                <ClickSpark>
                  <Button 
                    variant="outline" 
                    onClick={handleGoogleDriveUpload}
                    className="text-white border-white/20 hover:border-white/40"
                  >
                    Upload from Google Drive
                  </Button>
                </ClickSpark>
                
                <ClickSpark>
                  <Button 
                    onClick={handleNext}
                    className="bg-primary hover:bg-primary/90"
                    disabled={isUploading}
                  >
                    {isUploading ? 'Uploading...' : 'Next'}
                  </Button>
                </ClickSpark>
              </div>
              
              {uploadedFile && !isUploaded && (
                <div className="mt-4 text-center">
                  <ClickSpark>
                    <Button 
                      onClick={handleUploadToDatabase}
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={isUploading}
                    >
                      {isUploading ? 'Saving...' : 'Save to Database'}
                    </Button>
                  </ClickSpark>
                </div>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default UploadResume;