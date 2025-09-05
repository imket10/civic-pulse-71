import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { 
  BarChart3, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Search,
  Filter,
  Calendar,
  MapPin,
  User,
  FileText
} from "lucide-react";

interface AdminReport {
  id: string;
  title: string;
  category: string;
  status: "pending" | "assigned" | "in-progress" | "resolved";
  priority: "low" | "medium" | "high";
  reportedBy: string;
  assignedTo?: string;
  department: string;
  date: string;
  location: string;
  description: string;
  estimatedResolution?: string;
}

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  // Mock admin reports data
  const reports: AdminReport[] = [
    {
      id: "CR-2024-1001",
      title: "Large pothole on Main Street",
      category: "Road & Traffic",
      status: "in-progress",
      priority: "high",
      reportedBy: "john.doe@email.com",
      assignedTo: "Mike Johnson",
      department: "Public Works",
      date: "2024-01-15",
      location: "Main Street, near City Hall",
      description: "Deep pothole causing damage to vehicles, approximately 3 feet wide",
      estimatedResolution: "2024-01-25"
    },
    {
      id: "CR-2024-0892",
      title: "Broken streetlight",
      category: "Street Lighting",
      status: "resolved",
      priority: "medium",
      reportedBy: "sarah.m@email.com",
      assignedTo: "Tom Wilson", 
      department: "Electrical Services",
      date: "2024-01-10",
      location: "Park Avenue & 5th Street",
      description: "Streetlight has been out for several days, affecting pedestrian safety"
    },
    {
      id: "CR-2024-0743",
      title: "Overflowing trash bin",
      category: "Waste Management",
      status: "assigned",
      priority: "low",
      reportedBy: "mike.r@email.com",
      assignedTo: "Lisa Chen",
      department: "Sanitation",
      date: "2024-01-18",
      location: "Central Park entrance",
      description: "Trash bin is overflowing and attracting pests",
      estimatedResolution: "2024-01-22"
    },
    {
      id: "CR-2024-0654",
      title: "Damaged playground equipment",
      category: "Parks & Recreation",
      status: "pending",
      priority: "high",
      reportedBy: "emily.l@email.com",
      department: "Parks Department",
      date: "2024-01-12",
      location: "Riverside Park playground",
      description: "Swing set has broken chains, potential safety hazard for children"
    }
  ];

  const departments = ["Public Works", "Electrical Services", "Sanitation", "Parks Department", "Water Department"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "status-pending";
      case "assigned": return "bg-blue-100 text-blue-800";
      case "in-progress": return "status-progress";
      case "resolved": return "status-success";
      default: return "status-pending";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-destructive font-semibold";
      case "medium": return "text-warning font-semibold";
      case "low": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const stats = {
    total: reports.length,
    pending: reports.filter(r => r.status === "pending").length,
    inProgress: reports.filter(r => r.status === "in-progress").length + reports.filter(r => r.status === "assigned").length,
    resolved: reports.filter(r => r.status === "resolved").length,
    highPriority: reports.filter(r => r.priority === "high").length
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reportedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    const matchesDepartment = departmentFilter === "all" || report.department === departmentFilter;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-2">Municipal Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and track civic issue reports across all departments
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="p-4 text-center">
            <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total Reports</div>
          </Card>
          <Card className="p-4 text-center">
            <Clock className="w-8 h-8 text-pending mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.pending}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </Card>
          <Card className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-progress mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.inProgress}</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </Card>
          <Card className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.resolved}</div>
            <div className="text-sm text-muted-foreground">Resolved</div>
          </Card>
          <Card className="p-4 text-center">
            <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.highPriority}</div>
            <div className="text-sm text-muted-foreground">High Priority</div>
          </Card>
        </div>

        <Tabs defaultValue="reports" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reports">Reports Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
          </TabsList>

          <TabsContent value="reports" className="space-y-6">
            {/* Filters */}
            <Card className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search reports by title, category, location, or reporter..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="md:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="assigned">Assigned</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="md:w-48">
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </Card>

            {/* Reports List */}
            <div className="space-y-4">
              {filteredReports.map((report) => (
                <Card key={report.id} className="issue-card">
                  <div className="flex flex-col lg:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold">{report.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {report.category}
                          </Badge>
                          <span className={`text-sm ${getPriorityColor(report.priority)} capitalize`}>
                            {report.priority} Priority
                          </span>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
                          {report.status === "in-progress" ? "In Progress" : report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4 leading-relaxed">{report.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>Reported: {new Date(report.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{report.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span>{report.reportedBy}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{report.department}</span>
                        </div>
                      </div>
                      
                      {report.assignedTo && (
                        <div className="mt-2 text-sm">
                          <span className="text-muted-foreground">Assigned to:</span>
                          <span className="font-medium ml-2">{report.assignedTo}</span>
                        </div>
                      )}
                      
                      {report.estimatedResolution && (
                        <div className="mt-2 text-sm">
                          <span className="text-muted-foreground">Estimated resolution:</span>
                          <span className="font-medium ml-2">{new Date(report.estimatedResolution).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 lg:w-48">
                      <Button size="sm" className="btn-civic w-full">
                        View Details
                      </Button>
                      {report.status === "pending" && (
                        <Button size="sm" variant="outline" className="w-full">
                          Assign to Staff
                        </Button>
                      )}
                      {(report.status === "assigned" || report.status === "in-progress") && (
                        <Button size="sm" variant="outline" className="w-full">
                          Update Status
                        </Button>
                      )}
                      <Badge variant="secondary" className="font-mono text-xs text-center">
                        {report.id}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Reports by Category</h3>
                </div>
                <div className="space-y-3">
                  {["Road & Traffic", "Street Lighting", "Waste Management", "Parks & Recreation"].map(category => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-sm">{category}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: `${Math.random() * 80 + 20}%` }}></div>
                        </div>
                        <span className="text-sm font-medium">{Math.floor(Math.random() * 50 + 10)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Resolution Trends</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Average Resolution Time</span>
                    <span className="font-semibold">7.2 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Reports This Month</span>
                    <span className="font-semibold">127</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Resolution Rate</span>
                    <span className="font-semibold text-success">94%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Citizen Satisfaction</span>
                    <span className="font-semibold text-success">4.6/5</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map(department => (
                <Card key={department} className="p-6">
                  <h3 className="font-semibold mb-4">{department}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Active Reports</span>
                      <span className="font-semibold">{Math.floor(Math.random() * 20 + 5)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Avg Resolution</span>
                      <span className="font-semibold">{Math.floor(Math.random() * 10 + 3)} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Staff Members</span>
                      <span className="font-semibold">{Math.floor(Math.random() * 15 + 5)}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;