import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StatusBadge from "@/components/StatusBadge";
import { 
  Search, 
  Filter, 
  Eye, 
  UserCheck, 
  RotateCw,
  MapPin,
  Calendar,
  AlertTriangle,
  FileText
} from "lucide-react";

interface Complaint {
  id: string;
  title: string;
  category: string;
  citizenName: string;
  citizenEmail: string;
  location: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "assigned" | "in-progress" | "resolved";
  date: string;
  assignedTo?: string;
}

const ComplaintsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // Mock data - replace with Supabase data
  const complaints: Complaint[] = [
    {
      id: "CR-2024-1001",
      title: "Large pothole on Main Street",
      category: "Road & Traffic",
      citizenName: "John Doe",
      citizenEmail: "john.doe@email.com",
      location: "Main Street, near City Hall",
      priority: "high",
      status: "in-progress",
      date: "2024-01-15",
      assignedTo: "Mike Johnson"
    },
    {
      id: "CR-2024-0892",
      title: "Broken streetlight",
      category: "Street Lighting", 
      citizenName: "Sarah Miller",
      citizenEmail: "sarah.m@email.com",
      location: "Park Avenue & 5th Street",
      priority: "medium",
      status: "resolved",
      date: "2024-01-10",
      assignedTo: "Tom Wilson"
    },
    {
      id: "CR-2024-0743",
      title: "Overflowing trash bin",
      category: "Waste Management",
      citizenName: "Mike Roberts",
      citizenEmail: "mike.r@email.com", 
      location: "Central Park entrance",
      priority: "low",
      status: "assigned",
      date: "2024-01-18",
      assignedTo: "Lisa Chen"
    },
    {
      id: "CR-2024-0654",
      title: "Damaged playground equipment",
      category: "Parks & Recreation",
      citizenName: "Emily Lopez",
      citizenEmail: "emily.l@email.com",
      location: "Riverside Park playground", 
      priority: "high",
      status: "pending",
      date: "2024-01-12"
    }
  ];

  const categories = ["Road & Traffic", "Street Lighting", "Waste Management", "Parks & Recreation"];
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-destructive";
      case "medium": return "text-warning";
      case "low": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.citizenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || complaint.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || complaint.category === categoryFilter;
    const matchesPriority = priorityFilter === "all" || complaint.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-2">Complaints Management</h1>
          <p className="text-muted-foreground">
            View, assign, and track all citizen complaints
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center">
            <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{complaints.length}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </Card>
          <Card className="p-4 text-center">
            <AlertTriangle className="w-8 h-8 text-pending mx-auto mb-2" />
            <div className="text-2xl font-bold">{complaints.filter(c => c.status === "pending").length}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </Card>
          <Card className="p-4 text-center">
            <RotateCw className="w-8 h-8 text-progress mx-auto mb-2" />
            <div className="text-2xl font-bold">{complaints.filter(c => c.status === "in-progress" || c.status === "assigned").length}</div>
            <div className="text-sm text-muted-foreground">Active</div>
          </Card>
          <Card className="p-4 text-center">
            <UserCheck className="w-8 h-8 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold">{complaints.filter(c => c.status === "resolved").length}</div>
            <div className="text-sm text-muted-foreground">Resolved</div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search complaints, citizens, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="lg:w-48">
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
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="lg:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="lg:w-48">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Complaints Table */}
        <Card>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Citizen</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredComplaints.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell className="font-mono text-sm">{complaint.id}</TableCell>
                    <TableCell className="font-medium">{complaint.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {complaint.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{complaint.citizenName}</span>
                        <span className="text-xs text-muted-foreground">{complaint.citizenEmail}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 max-w-48">
                        <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm truncate">{complaint.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`text-sm font-medium ${getPriorityColor(complaint.priority)} capitalize`}>
                        {complaint.priority}
                      </span>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={complaint.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm">{new Date(complaint.date).toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        {complaint.status === "pending" && (
                          <Button size="sm" variant="outline">
                            <UserCheck className="w-3 h-3 mr-1" />
                            Assign
                          </Button>
                        )}
                        {(complaint.status === "assigned" || complaint.status === "in-progress") && (
                          <Button size="sm" variant="outline">
                            <RotateCw className="w-3 h-3 mr-1" />
                            Update
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ComplaintsList;