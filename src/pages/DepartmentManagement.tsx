import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Plus, 
  Building, 
  Users, 
  Edit, 
  Trash2,
  UserPlus,
  Phone,
  Mail,
  MapPin,
  Clock
} from "lucide-react";

interface Department {
  id: string;
  name: string;
  description: string;
  head: string;
  headEmail: string;
  headPhone: string;
  staffCount: number;
  activeComplaints: number;
  avgResolutionTime: string;
  location: string;
  staff: Staff[];
}

interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  joinDate: string;
  activeComplaints: number;
}

const DepartmentManagement = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [isAddDepartmentOpen, setIsAddDepartmentOpen] = useState(false);
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);

  // Mock data - replace with Supabase data
  const departments: Department[] = [
    {
      id: "dept-1",
      name: "Public Works",
      description: "Responsible for road maintenance, infrastructure, and public facilities",
      head: "Mike Johnson",
      headEmail: "mike.johnson@municipality.gov",
      headPhone: "+1 (555) 123-4567",
      staffCount: 12,
      activeComplaints: 8,
      avgResolutionTime: "5.2 days",
      location: "City Hall - Building A",
      staff: [
        {
          id: "staff-1",
          name: "Sarah Wilson",
          email: "sarah.wilson@municipality.gov",
          phone: "+1 (555) 234-5678",
          role: "Senior Engineer",
          joinDate: "2022-01-15",
          activeComplaints: 3
        },
        {
          id: "staff-2", 
          name: "Tom Anderson",
          email: "tom.anderson@municipality.gov",
          phone: "+1 (555) 345-6789",
          role: "Field Supervisor",
          joinDate: "2023-03-20",
          activeComplaints: 2
        }
      ]
    },
    {
      id: "dept-2",
      name: "Electrical Services",
      description: "Street lighting, traffic signals, and electrical infrastructure",
      head: "Lisa Chen",
      headEmail: "lisa.chen@municipality.gov", 
      headPhone: "+1 (555) 987-6543",
      staffCount: 8,
      activeComplaints: 3,
      avgResolutionTime: "3.1 days",
      location: "Maintenance Center",
      staff: [
        {
          id: "staff-3",
          name: "David Miller",
          email: "david.miller@municipality.gov",
          phone: "+1 (555) 456-7890",
          role: "Electrical Technician",
          joinDate: "2021-09-10",
          activeComplaints: 1
        }
      ]
    },
    {
      id: "dept-3",
      name: "Sanitation",
      description: "Waste management, recycling, and street cleaning services",
      head: "Robert Garcia",
      headEmail: "robert.garcia@municipality.gov",
      headPhone: "+1 (555) 654-3210",
      staffCount: 15,
      activeComplaints: 5,
      avgResolutionTime: "2.8 days",
      location: "Sanitation Depot",
      staff: []
    },
    {
      id: "dept-4",
      name: "Parks & Recreation", 
      description: "Park maintenance, recreational facilities, and green spaces",
      head: "Emily Rodriguez",
      headEmail: "emily.rodriguez@municipality.gov",
      headPhone: "+1 (555) 321-0987",
      staffCount: 10,
      activeComplaints: 4,
      avgResolutionTime: "4.5 days",
      location: "Parks Administration Office",
      staff: []
    }
  ];

  const handleAddDepartment = () => {
    // This will need Supabase integration
    setIsAddDepartmentOpen(false);
  };

  const handleAddStaff = () => {
    // This will need Supabase integration  
    setIsAddStaffOpen(false);
  };

  const selectedDept = departments.find(d => d.id === selectedDepartment);

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Department Management</h1>
              <p className="text-muted-foreground">
                Manage departments and assign staff members
              </p>
            </div>
            <Dialog open={isAddDepartmentOpen} onOpenChange={setIsAddDepartmentOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Department
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Department</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="dept-name">Department Name</Label>
                    <Input id="dept-name" placeholder="e.g., Water Services" />
                  </div>
                  <div>
                    <Label htmlFor="dept-desc">Description</Label>
                    <Textarea id="dept-desc" placeholder="Department responsibilities..." />
                  </div>
                  <div>
                    <Label htmlFor="dept-head">Department Head</Label>
                    <Input id="dept-head" placeholder="Full name" />
                  </div>
                  <div>
                    <Label htmlFor="dept-location">Location</Label>
                    <Input id="dept-location" placeholder="Building/Office location" />
                  </div>
                  <Button onClick={handleAddDepartment} className="w-full">
                    Create Department
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Departments List */}
          <div className="lg:col-span-2">
            <div className="grid gap-6">
              {departments.map((department) => (
                <Card 
                  key={department.id} 
                  className={`p-6 cursor-pointer transition-colors ${
                    selectedDepartment === department.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedDepartment(department.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Building className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{department.name}</h3>
                        <p className="text-muted-foreground text-sm">{department.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{department.staffCount}</div>
                      <div className="text-xs text-muted-foreground">Staff Members</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-warning">{department.activeComplaints}</div>
                      <div className="text-xs text-muted-foreground">Active Cases</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success">{department.avgResolutionTime}</div>
                      <div className="text-xs text-muted-foreground">Avg Resolution</div>
                    </div>
                    <div className="text-center">
                      <Badge variant="outline" className="px-2 py-1">
                        Active
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Head:</span>
                      <span>{department.head}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{department.location}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Department Details Sidebar */}
          <div className="space-y-6">
            {selectedDept ? (
              <>
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Department Head</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium">{selectedDept.head}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedDept.headEmail}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedDept.headPhone}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Staff Members</h3>
                    <Dialog open={isAddStaffOpen} onOpenChange={setIsAddStaffOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <UserPlus className="w-4 h-4 mr-2" />
                          Add Staff
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Staff Member</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="staff-name">Full Name</Label>
                            <Input id="staff-name" placeholder="Staff member name" />
                          </div>
                          <div>
                            <Label htmlFor="staff-email">Email</Label>
                            <Input id="staff-email" type="email" placeholder="email@municipality.gov" />
                          </div>
                          <div>
                            <Label htmlFor="staff-phone">Phone</Label>
                            <Input id="staff-phone" placeholder="+1 (555) 000-0000" />
                          </div>
                          <div>
                            <Label htmlFor="staff-role">Role</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="technician">Technician</SelectItem>
                                <SelectItem value="supervisor">Supervisor</SelectItem>
                                <SelectItem value="engineer">Engineer</SelectItem>
                                <SelectItem value="coordinator">Coordinator</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button onClick={handleAddStaff} className="w-full">
                            Add Staff Member
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  
                  <div className="space-y-3">
                    {selectedDept.staff.length > 0 ? (
                      selectedDept.staff.map((staff) => (
                        <div key={staff.id} className="border rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{staff.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              {staff.activeComplaints} active
                            </Badge>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">{staff.role}</p>
                            <div className="flex items-center gap-2">
                              <Mail className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs">{staff.email}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No staff members added yet</p>
                      </div>
                    )}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Active Complaints</span>
                      <span className="font-semibold">{selectedDept.activeComplaints}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Staff Utilization</span>
                      <span className="font-semibold">85%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Avg Resolution Time</span>
                      <span className="font-semibold">{selectedDept.avgResolutionTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Satisfaction Rate</span>
                      <span className="font-semibold text-success">4.2/5</span>
                    </div>
                  </div>
                </Card>
              </>
            ) : (
              <Card className="p-6">
                <div className="text-center py-8">
                  <Building className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="font-semibold mb-2">Select a Department</h3>
                  <p className="text-sm text-muted-foreground">
                    Click on a department from the list to view details and manage staff
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentManagement;