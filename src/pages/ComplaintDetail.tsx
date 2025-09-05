import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import StatusBadge from "@/components/StatusBadge";
import { 
  ArrowLeft,
  MapPin, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  Camera,
  AlertTriangle,
  UserCheck,
  MessageSquare,
  Building
} from "lucide-react";

const ComplaintDetail = () => {
  const [status, setStatus] = useState<"pending" | "assigned" | "in-progress" | "resolved">("pending");
  const [assignedDepartment, setAssignedDepartment] = useState("");
  const [assignedStaff, setAssignedStaff] = useState("");
  const [notes, setNotes] = useState("");

  // Mock data - replace with Supabase data
  const complaint = {
    id: "CR-2024-1001",
    title: "Large pothole on Main Street",
    description: "There is a very large pothole on Main Street near the City Hall entrance. It's approximately 3 feet wide and 8 inches deep. Several cars have been damaged by this pothole, and it poses a serious safety hazard. The pothole has been growing larger due to recent rains.",
    category: "Road & Traffic",
    priority: "high",
    status: "pending" as const,
    date: "2024-01-15",
    location: "Main Street, near City Hall",
    coordinates: { lat: 40.7128, lng: -74.0060 },
    citizenInfo: {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567"
    },
    photo: "/placeholder.svg",
    assignedTo: null,
    department: null,
    estimatedResolution: null,
    updates: [
      {
        date: "2024-01-15",
        status: "pending",
        message: "Complaint submitted by citizen",
        author: "System"
      }
    ]
  };

  const departments = [
    "Public Works",
    "Electrical Services", 
    "Sanitation",
    "Parks Department",
    "Water Department"
  ];

  const staffMembers = [
    "Mike Johnson",
    "Sarah Wilson", 
    "Tom Anderson",
    "Lisa Chen",
    "David Miller"
  ];

  const handleStatusUpdate = () => {
    // This will need Supabase integration
    console.log("Updating status:", { status, assignedDepartment, assignedStaff, notes });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-destructive";
      case "medium": return "text-warning"; 
      case "low": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Complaints
            </Button>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{complaint.title}</h1>
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="font-mono">
                  {complaint.id}
                </Badge>
                <StatusBadge status={complaint.status} />
                <span className={`text-sm font-medium ${getPriorityColor(complaint.priority)} capitalize`}>
                  {complaint.priority} Priority
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                Contact Citizen
              </Button>
              <Button>
                <AlertTriangle className="w-4 h-4 mr-2" />
                Mark Urgent
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Complaint Details */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Complaint Details</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {complaint.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Category</h4>
                    <Badge variant="outline">{complaint.category}</Badge>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Location</h4>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{complaint.location}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Date Reported</h4>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{new Date(complaint.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Photo Evidence */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Photo Evidence
              </h3>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <img 
                  src={complaint.photo} 
                  alt="Complaint photo"
                  className="rounded-lg max-h-full max-w-full object-cover"
                />
              </div>
            </Card>

            {/* Map View */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Location on Map
              </h3>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Interactive map integration needed</p>
                  <p className="text-sm text-muted-foreground">Coordinates: {complaint.coordinates.lat}, {complaint.coordinates.lng}</p>
                </div>
              </div>
            </Card>

            {/* Status Updates History */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Status History</h3>
              <div className="space-y-4">
                {complaint.updates.map((update, index) => (
                  <div key={index} className="flex gap-4 pb-4 border-b last:border-b-0">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{update.author}</span>
                        <StatusBadge status={update.status as "pending" | "assigned" | "in-progress" | "resolved"} />
                        <span className="text-xs text-muted-foreground">
                          {new Date(update.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{update.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Citizen Information */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Citizen Information
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">{complaint.citizenInfo.name}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{complaint.citizenInfo.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{complaint.citizenInfo.phone}</span>
                </div>
              </div>
            </Card>

            {/* Assignment & Status Update */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <UserCheck className="w-5 h-5" />
                Assignment & Status
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Department</label>
                  <Select value={assignedDepartment} onValueChange={setAssignedDepartment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4" />
                            {dept}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Assign to Staff</label>
                  <Select value={assignedStaff} onValueChange={setAssignedStaff}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select staff member" />
                    </SelectTrigger>
                    <SelectContent>
                      {staffMembers.map(staff => (
                        <SelectItem key={staff} value={staff}>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {staff}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Update Status</label>
                  <Select value={status} onValueChange={(value) => setStatus(value as "pending" | "assigned" | "in-progress" | "resolved")}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="assigned">Assigned</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Add Notes</label>
                  <Textarea
                    placeholder="Add status update notes..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                  />
                </div>

                <Button onClick={handleStatusUpdate} className="w-full">
                  Update Complaint
                </Button>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send SMS Update
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Citizen
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Escalate Issue
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetail;