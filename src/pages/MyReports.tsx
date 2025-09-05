import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Calendar, MapPin, Clock, CheckCircle, AlertCircle, Timer } from "lucide-react";

interface Report {
  id: string;
  title: string;
  category: string;
  status: "pending" | "in-progress" | "resolved";
  date: string;
  location: string;
  description: string;
  priority: "low" | "medium" | "high";
}

const MyReports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock reports data
  const reports: Report[] = [
    {
      id: "CR-2024-1001",
      title: "Large pothole on Main Street",
      category: "Road & Traffic",
      status: "in-progress",
      date: "2024-01-15",
      location: "Main Street, near City Hall",
      description: "Deep pothole causing damage to vehicles",
      priority: "high"
    },
    {
      id: "CR-2024-0892",
      title: "Broken streetlight in Park Avenue",
      category: "Street Lighting",
      status: "resolved",
      date: "2024-01-10",
      location: "Park Avenue & 5th Street intersection",
      description: "Streetlight has been out for several days",
      priority: "medium"
    },
    {
      id: "CR-2024-0743",
      title: "Overflowing trash bin at Central Park",
      category: "Waste Management",
      status: "pending",
      date: "2024-01-18",
      location: "Central Park, near main entrance",
      description: "Trash bin is overflowing and attracting pests",
      priority: "low"
    },
    {
      id: "CR-2024-0654",
      title: "Damaged playground equipment",
      category: "Parks & Recreation",
      status: "in-progress",
      date: "2024-01-12",
      location: "Riverside Park playground",
      description: "Swing set has broken chains, safety hazard",
      priority: "high"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Timer className="w-4 h-4" />;
      case "in-progress": return <AlertCircle className="w-4 h-4" />;
      case "resolved": return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "status-pending";
      case "in-progress": return "status-progress";
      case "resolved": return "status-success";
      default: return "status-pending";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-destructive";
      case "medium": return "text-warning";
      case "low": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: reports.length,
    pending: reports.filter(r => r.status === "pending").length,
    "in-progress": reports.filter(r => r.status === "in-progress").length,
    resolved: reports.filter(r => r.status === "resolved").length
  };

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">My Reports</h1>
          <p className="text-xl text-muted-foreground">
            Track the progress of your submitted civic issue reports.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(statusCounts).map(([status, count]) => (
            <Card key={status} className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{count}</div>
              <div className="text-sm text-muted-foreground capitalize">
                {status === "in-progress" ? "In Progress" : status}
              </div>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search reports by title, category, or location..."
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
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.length === 0 ? (
            <Card className="p-12 text-center">
              <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No reports found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || statusFilter !== "all" 
                  ? "Try adjusting your search or filter criteria."
                  : "You haven't submitted any reports yet."
                }
              </p>
              <Button className="btn-civic">
                Report New Issue
              </Button>
            </Card>
          ) : (
            filteredReports.map((report) => (
              <Card key={report.id} className="issue-card">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold">{report.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {report.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-2 md:mt-0">
                    <span className={`text-sm font-medium ${getPriorityColor(report.priority)} capitalize`}>
                      {report.priority} Priority
                    </span>
                    <div className={`flex items-center gap-2 ${getStatusColor(report.status)}`}>
                      {getStatusIcon(report.status)}
                      <span className="capitalize text-sm font-medium">
                        {report.status === "in-progress" ? "In Progress" : report.status}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{report.description}</p>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Reported: {new Date(report.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{report.location}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Badge variant="secondary" className="font-mono text-xs">
                      {report.id}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyReports;