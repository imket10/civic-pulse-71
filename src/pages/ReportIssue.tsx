import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Camera, MapPin, Upload, CheckCircle } from "lucide-react";

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    photo: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const categories = [
    "Road & Traffic",
    "Street Lighting",
    "Waste Management", 
    "Water & Drainage",
    "Parks & Recreation",
    "Public Safety",
    "Building & Infrastructure",
    "Other"
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      toast({
        title: "Photo uploaded successfully",
        description: "Your photo has been attached to the report."
      });
    }
  };

  const handleLocationDetect = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData({ 
            ...formData, 
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}` 
          });
          toast({
            title: "Location detected",
            description: "Your current location has been added to the report."
          });
        },
        () => {
          toast({
            title: "Location access denied",
            description: "Please enter your location manually or enable location services.",
            variant: "destructive"
          });
        }
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Report submitted successfully!",
      description: "Your issue has been reported. You'll receive updates on its progress."
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-muted/30 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="text-center p-12">
            <CheckCircle className="w-20 h-20 text-success mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Report Submitted!</h1>
            <div className="bg-muted p-4 rounded-lg mb-6">
              <p className="font-semibold text-lg mb-2">Report ID: #CR-2024-{Math.floor(Math.random() * 10000)}</p>
              <p className="text-muted-foreground">Save this ID to track your report's progress</p>
            </div>
            <p className="text-muted-foreground mb-8">
              Thank you for helping improve our community! You'll receive email updates as your report progresses through review, assignment, and resolution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => setIsSubmitted(false)} className="btn-civic">
                Submit Another Report
              </Button>
              <Button variant="outline" onClick={() => window.location.href = "/reports"}>
                View My Reports
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Report a Civic Issue</h1>
          <p className="text-xl text-muted-foreground">
            Help us improve the community by reporting issues that need attention.
          </p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <Label htmlFor="title" className="text-base font-semibold">Issue Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Brief description of the issue"
                required
                className="mt-2"
              />
            </div>

            {/* Category */}
            <div>
              <Label className="text-base font-semibold">Category *</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, category: value })} required>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select issue category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-base font-semibold">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Provide detailed information about the issue..."
                rows={4}
                required
                className="mt-2"
              />
            </div>

            {/* Location */}
            <div>
              <Label htmlFor="location" className="text-base font-semibold">Location *</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Enter address or coordinates"
                  required
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleLocationDetect}
                  className="px-4"
                >
                  <MapPin className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <Label className="text-base font-semibold">Photo Evidence</Label>
              <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  {formData.photo ? (
                    <div className="text-success">
                      <Upload className="w-8 h-8 mx-auto mb-2" />
                      <p className="font-semibold">{formData.photo.name}</p>
                      <p className="text-sm text-muted-foreground">Click to change photo</p>
                    </div>
                  ) : (
                    <div className="text-muted-foreground">
                      <Camera className="w-12 h-12 mx-auto mb-4" />
                      <p className="font-semibold mb-2">Upload a photo</p>
                      <p className="text-sm">Photos help us understand and resolve issues faster</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full btn-civic py-3 text-lg"
            >
              {isSubmitting ? "Submitting Report..." : "Submit Report"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ReportIssue;