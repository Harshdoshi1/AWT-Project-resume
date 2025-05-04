import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ResumeData } from "@/types/resume";

interface TemplateUploaderProps {
  onTemplateLoad: (data: ResumeData) => void;
}

const TemplateUploader = ({ onTemplateLoad }: TemplateUploaderProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const text = await file.text();
      const data = JSON.parse(text);

      // Validate the required fields
      if (!data.fullName || !data.email) {
        throw new Error("Invalid template format: Missing required fields");
      }

      onTemplateLoad(data as ResumeData);
      toast({
        title: "Success",
        description: "Template loaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load template. Please check the file format.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <label htmlFor="template-upload" className="cursor-pointer">
        <Button
          variant="outline"
          className="w-full"
          disabled={isLoading}
        >
          <Upload className="w-4 h-4 mr-2" />
          {isLoading ? "Loading..." : "Upload Template"}
        </Button>
      </label>
      <input
        id="template-upload"
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default TemplateUploader;