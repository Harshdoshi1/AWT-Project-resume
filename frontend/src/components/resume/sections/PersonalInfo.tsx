import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import RichTextEditor from "@/components/ui/rich-text-editor";

interface PersonalInfoProps {
  data: {
    fullName: string;
    email: string;
    summary: string;
    contact: {
      phone: string;
      location: string;
      website: string;
      github: string;
      linkedin: string;
    };
  };
  onUpdate: (data: any) => void;
}

const PersonalInfo = ({ data, onUpdate }: PersonalInfoProps) => {
  const handleInputChange = (field: string, value: string) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Personal Information</h2>
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-white">Full Name</Label>
        <Input
          id="fullName"
          value={data.fullName}
          onChange={(e) => handleInputChange("fullName", e.target.value)}
          className="bg-white/20 border-none text-white placeholder:text-white/50"
          placeholder="John Doe"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-white">Email</Label>
        <Input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className="bg-white/20 border-none text-white placeholder:text-white/50"
          placeholder="john@example.com"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-white">Phone</Label>
        <Input
          id="phone"
          value={data.contact?.phone}
          onChange={(e) => onUpdate({ contact: { ...data.contact, phone: e.target.value } })}
          className="bg-white/20 border-none text-white placeholder:text-white/50"
          placeholder="+1 234 567 890"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="location" className="text-white">Location</Label>
        <Input
          id="location"
          value={data.contact?.location}
          onChange={(e) => onUpdate({ contact: { ...data.contact, location: e.target.value } })}
          className="bg-white/20 border-none text-white placeholder:text-white/50"
          placeholder="City, Country"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="website" className="text-white">Personal Website</Label>
        <Input
          id="website"
          value={data.contact?.website}
          onChange={(e) => onUpdate({ contact: { ...data.contact, website: e.target.value } })}
          className="bg-white/20 border-none text-white placeholder:text-white/50"
          placeholder="https://yourwebsite.com"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="github" className="text-white">GitHub</Label>
        <Input
          id="github"
          value={data.contact?.github}
          onChange={(e) => onUpdate({ contact: { ...data.contact, github: e.target.value } })}
          className="bg-white/20 border-none text-white placeholder:text-white/50"
          placeholder="https://github.com/yourusername"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="linkedin" className="text-white">LinkedIn</Label>
        <Input
          id="linkedin"
          value={data.contact?.linkedin}
          onChange={(e) => onUpdate({ contact: { ...data.contact, linkedin: e.target.value } })}
          className="bg-white/20 border-none text-white placeholder:text-white/50"
          placeholder="https://linkedin.com/in/yourusername"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="summary" className="text-white">Professional Summary</Label>
        <RichTextEditor
          value={data.summary}
          onChange={(value) => handleInputChange("summary", value)}
          placeholder="Write a brief professional summary..."
        />
      </div>
    </div>
  );
};

export default PersonalInfo;