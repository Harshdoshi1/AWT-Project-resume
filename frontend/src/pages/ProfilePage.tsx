import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Save,
  Eye,
  Calendar,
  PenLine,
  Check,
  ChevronRight,
  X,
  Shield,
  Award,
  Briefcase,
  Gem,
  Plus,
} from "lucide-react";
import { ClickSpark } from '@/components/ui/click-spark'; 
import { useTheme } from '@/components/theme-provider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Profile = () => {
  const { user, signOut } = useAuth();
  
  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Please log in to view your profile</div>;
  }

  const [userData, setUserData] = useState({
    name: user.user_metadata?.full_name || '',
    email: user.email || '',
    phone: user.user_metadata?.phone || "+1234567890",
    location: user.user_metadata?.location || "Rajkot, Gujrat ",
    github: user.user_metadata?.github || "github.com/johndoe",
    linkedin: user.user_metadata?.linkedin || "linkedin.com/in/johndoe",
    twitter: user.user_metadata?.twitter || "twitter.com/johndoe",
    website: user.user_metadata?.website || "johndoe.com",
    profilePic: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...userData });
  const { theme, setTheme } = useTheme();
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const previousResumes = [
    { id: "1", name: "Software Engineer Resume", date: "2024-02-20" },
    { id: "2", name: "Product Manager Resume", date: "2024-02-15" },
    { id: "3", name: "UX Designer Resume", date: "2024-01-30" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setEditData({
      ...editData,
      [field]: value,
    });
  };

  const handleSaveChanges = () => {
    // API call would go here
    // POST /api/profile with userData
    setUserData(editData);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleCancelEdit = () => {
    setEditData({ ...userData });
    setIsEditing(false);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 animated-gradient">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-5xl mx-auto space-y-10"
      >
        {/* Profile Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Your Profile</h1>
          <p className="text-mauve/80 max-w-2xl mx-auto"></p>
        </motion.div>

        {/* Profile Information Card */}
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden glass-card">
            <div className="p-8 relative">
              {!isEditing && (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  size="sm"
                  className="absolute right-8 top-8 bg-french-violet/20 hover:bg-french-violet/30 border-mauve/30 text-white"
                >
                  <PenLine className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}

              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Profile Avatar */}
                <motion.div
                  className="relative"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-french-violet to-heliotrope flex items-center justify-center text-white text-4xl font-bold shadow-lg ring-4 ring-tekhelet/30 relative overflow-hidden">
                    {editData.profilePic ? (
                      <img 
                        src={editData.profilePic} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{userData.name ? userData.name.charAt(0) : '?'}</span>
                    )}
                    {isEditing && (
                      <>
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Plus className="w-8 h-8 text-white" />
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                setEditData({...editData, profilePic: event.target?.result as string});
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </>
                    )}
                  </div>
                </motion.div>

                {/* Profile Details */}
                <div className="flex-1 text-center md:text-left">
                  <motion.h2
                    className="text-3xl font-bold text-white mb-2"
                    variants={itemVariants}
                  >
                    {userData.name}
                    <ClickSpark colors={['#191A19', '#4E9F3D', '#B4BDFF', '#D8E9A8']}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-4 bg-french-violet/20 hover:bg-french-violet/30 border-mauve/30 text-white"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                      >
                        Change Theme
                      </Button>
                    </ClickSpark>
                    <ClickSpark colors={['#191A19', '#4E9F3D', '#B4BDFF', '#D8E9A8']}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-4 bg-french-violet/20 hover:bg-french-violet/30 border-mauve/30 text-white"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit
                      </Button>
                    </ClickSpark>
                    <ClickSpark colors={['#191A19', '#4E9F3D', '#B4BDFF', '#D8E9A8']}> 
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-4 bg-red-600 hover:bg-red-700 border-mauve/30 text-white"
                        onClick={async () => {
                          try {
                            await signOut();
                            window.location.href = '/login';
                            toast({
                              title: "Logged Out",
                              description: "You have been successfully logged out.",
                            });
                          } catch (error) {
                            console.error("Logout error:", error);
                            toast({
                              title: "Logout Failed",
                              description: "An error occurred while logging out.",
                            });
                          }
                        }}
                      >
                        Logout
                      </Button>
                    </ClickSpark>
                  </motion.h2>
                  <motion.p
                    className="text-mauve mb-6 flex items-center justify-center md:justify-start"
                    variants={itemVariants}
                  >
                    <MapPin className="inline-block mr-2 h-4 w-4" />
                    {userData.location}
                  </motion.p>

                  <AnimatePresence mode="wait">
                    {isEditing ? (
                      <motion.div
                        key="edit-form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8"
                      >
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="name" className="text-white/90 mb-2 block">
                              Full Name
                            </Label>
                            <div className="relative">
                              <Input
                                id="name"
                                value={editData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                className="pl-10 bg-gray-800 border-mauve/30 text-white"
                              />
                              <User className="w-4 h-4 absolute left-3 top-3 text-mauve" />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="email" className="text-white/90 mb-2 block">
                              Email Address
                            </Label>
                            <div className="relative">
                              <Input
                                id="email"
                                type="email"
                                value={editData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                className="pl-10 bg-gray-800 border-mauve/30 text-white"
                              />
                              <Mail className="w-4 h-4 absolute left-3 top-3 text-mauve" />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="phone" className="text-white/90 mb-2 block">
                              Phone Number
                            </Label>
                            <div className="relative">
                              <Input
                                id="phone"
                                value={editData.phone}
                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                className="pl-10 bg-gray-800 border-mauve/30 text-white"
                              />
                              <Phone className="w-4 h-4 absolute left-3 top-3 text-mauve" />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="location" className="text-white/90 mb-2 block">
                              Location
                            </Label>
                            <div className="relative">
                              <Input
                                id="location"
                                value={editData.location}
                                onChange={(e) => handleInputChange("location", e.target.value)}
                                className="pl-10 bg-gray-800 border-mauve/30 text-white"
                              />
                              <MapPin className="w-4 h-4 absolute left-3 top-3 text-mauve" />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="github" className="text-white/90 mb-2 block">
                              GitHub Profile
                            </Label>
                            <div className="relative">
                              <Input
                                id="github"
                                value={editData.github}
                                onChange={(e) => handleInputChange("github", e.target.value)}
                                className="pl-10 bg-gray-800 border-mauve/30 text-white"
                              />
                              <Github className="w-4 h-4 absolute left-3 top-3 text-mauve" />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="linkedin" className="text-white/90 mb-2 block">
                              LinkedIn Profile
                            </Label>
                            <div className="relative">
                              <Input
                                id="linkedin"
                                value={editData.linkedin}
                                onChange={(e) => handleInputChange("linkedin", e.target.value)}
                                className="pl-10 bg-gray-800 border-mauve/30 text-white"
                              />
                              <Linkedin className="w-4 h-4 absolute left-3 top-3 text-mauve" />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="twitter" className="text-white/90 mb-2 block">
                              Twitter Profile
                            </Label>
                            <div className="relative">
                              <Input
                                id="twitter"
                                value={editData.twitter}
                                onChange={(e) => handleInputChange("twitter", e.target.value)}
                                className="pl-10 bg-gray-800 border-mauve/30 text-white"
                              />
                              <Twitter className="w-4 h-4 absolute left-3 top-3 text-mauve" />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="website" className="text-white/90 mb-2 block">
                              Personal Website
                            </Label>
                            <div className="relative">
                              <Input
                                id="website"
                                value={editData.website}
                                onChange={(e) => handleInputChange("website", e.target.value)}
                                className="pl-10 bg-gray-800 border-mauve/30 text-white"
                              />
                              <Globe className="w-4 h-4 absolute left-3 top-3 text-mauve" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="profile-display"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                      >
                        <ProfileCard
                          icon={<Mail className="w-6 h-6 text-heliotrope" />}
                          title="Contact"
                          items={[
                            { icon: <Mail className="w-4 h-4" />, value: userData.email },
                            { icon: <Phone className="w-4 h-4" />, value: userData.phone },
                          ]}
                        />
                        
                        <ProfileCard
                          icon={<Globe className="w-6 h-6 text-heliotrope" />}
                          title="Web Presence"
                          items={[
                            { icon: <Github className="w-4 h-4" />, value: userData.github, url: `https://${userData.github}` },
                            { icon: <Linkedin className="w-4 h-4" />, value: userData.linkedin, url: `https://${userData.linkedin}` },
                            { icon: <Twitter className="w-4 h-4" />, value: userData.twitter, url: `https://${userData.twitter}` },
                            { icon: <Globe className="w-4 h-4" />, value: userData.website, url: `https://${userData.website}` },
                          ]}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {isEditing && (
                    <div className="flex justify-end gap-4 mt-8">
                      <Button
                        onClick={handleCancelEdit}
                        variant="outline"
                        className="border-mauve/30 text-white hover:bg-russian-violet/50"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSaveChanges}
                        className="bg-gradient-to-r from-french-violet to-amethyst hover:opacity-90"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Resume Template Selector */}
        <motion.div variants={itemVariants}>
          <div className="mb-6">
            <Label htmlFor="resume-template">Select Resume Template</Label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dummy1">Dummy Template 1</SelectItem>
                <SelectItem value="dummy2">Dummy Template 2</SelectItem>
                <SelectItem value="dummy3">Professional Blue</SelectItem>
                <SelectItem value="dummy4">Modern Green</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Previous Resumes Card */}
        <motion.div variants={itemVariants}>
          <Card className="neo-blur overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Award className="w-6 h-6 mr-3 text-heliotrope" />
                Previous Resumes
              </h2>

              <div className="space-y-4">
                {previousResumes.map((resume, index) => (
                  
                  <motion.div
                    key={resume.id}
                    variants={itemVariants}
                    transition={{ delay: 0.1 * index }}
                    className="group relative overflow-hidden rounded-xl"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-persian-indigo/40 to-tekhelet/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                    <div className="flex items-center justify-between p-5 rounded-xl bg-persian-indigo/20 relative z-10">
                      <div className="flex items-center">
                        <div className="p-3 rounded-full bg-gradient-to-br from-french-violet to-amethyst mr-4 shadow-lg">
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium group-hover:text-heliotrope transition-colors">
                            {resume.name}
                          </h3>
                          <p className="text-sm text-white/60">{resume.date}</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-mauve/30 text-white hover:bg-french-violet/30 group-hover:border-heliotrope/50 transition-colors relative z-10"
                      >
                        
                        <Eye className="w-4 h-4 mr-2" />
                        View
                        <ChevronRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </Button>
                      
                    </div>
                  </motion.div>
                ))}
              </div>

              {previousResumes.length === 0 && (
                <motion.div variants={itemVariants} className="p-8 text-center">
                  <p className="text-white/60">
                    You haven't created any resumes yet.
                  </p>
                </motion.div>
                
              )}
            </div>
          </Card>
        </motion.div>

        {/* Account Stats */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard 
              icon={<Briefcase className="w-6 h-6 text-heliotrope" />}
              title="Resumes Created"
              value="5"
              change="+2 this month"
              positive
            />
            <StatCard 
              icon={<Eye className="w-6 h-6 text-heliotrope" />}
              title="Profile Views"
              value="127"
              change="+45% from last month"
              positive
            />
            <StatCard 
              icon={<Gem className="w-6 h-6 text-heliotrope" />}
              title="Account Status"
              value="Premium"
              change="Renews in 24 days"
              positive={false}
            />
            
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Helper components
const ProfileCard = ({ icon, title, items }) => (
  <div className="bg-gradient-to-br from-persian-indigo/20 to-transparent rounded-xl p-5 backdrop-blur-sm border border-persian-indigo/20 shadow-lg">
    <div className="flex items-center mb-4">
      <div className="p-2 rounded-md bg-persian-indigo/30 mr-3">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <div className="p-2 mr-3 rounded-md bg-persian-indigo/20">
            {item.icon}
          </div>
          {item.url ? (
            <a 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-mauve hover:text-heliotrope transition-colors"
            >
              {item.value}
            </a>
          ) : (
            <span className="text-white">{item.value}</span>
          )}
        </div>
      ))}
    </div>
  </div>
);

const StatCard = ({ icon, title, value, change, positive }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-gradient-to-br from-persian-indigo/20 to-transparent rounded-xl p-5 backdrop-blur-sm border border-persian-indigo/20 shadow-lg"
  >
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-mauve text-sm mb-1">{title}</h3>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
      <div className="p-2 rounded-md bg-persian-indigo/30">
        {icon}
      </div>
    </div>
    <p className={`text-xs mt-2 ${positive ? 'text-green-400' : 'text-mauve'}`}>
      {change}
    </p>
  </motion.div>
);

export default Profile;