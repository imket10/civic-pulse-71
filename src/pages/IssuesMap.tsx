import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Filter, Calendar, AlertCircle, CheckCircle, Timer, Layers } from "lucide-react";

interface MapIssue {
  id: string;
  title: string;
  category: string;
  status: "pending" | "in-progress" | "resolved";
  location: { lat: number; lng: number; address: string };
  priority: "low" | "medium" | "high";
  reportedBy: string;
  date: string;
}

const IssuesMap = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedIssue, setSelectedIssue] = useState<MapIssue | null>(null);

  // Mock issues data with coordinates
  const issues: MapIssue[] = [
    {
      id: "CR-2024-1001",
      title: "Large pothole on Main Street",
      category: "Road & Traffic",
      status: "in-progress",
      location: { lat: 40.7128, lng: -74.0060, address: "Main Street, near City Hall" },
      priority: "high",
      reportedBy: "John D.",
      date: "2024-01-15"
    },
    {
      id: "CR-2024-0892",
      title: "Broken streetlight",
      category: "Street Lighting",
      status: "resolved",
      location: { lat: 40.7135, lng: -74.0055, address: "Park Avenue & 5th Street" },
      priority: "medium",
      reportedBy: "Sarah M.",
      date: "2024-01-10"
    },
    {
      id: "CR-2024-0743",
      title: "Overflowing trash bin",
      category: "Waste Management",
      status: "pending",
      location: { lat: 40.7140, lng: -74.0045, address: "Central Park entrance" },
      priority: "low",
      reportedBy: "Mike R.",
      date: "2024-01-18"
    },
    {
      id: "CR-2024-0654",
      title: "Damaged playground equipment",
      category: "Parks & Recreation",
      status: "in-progress",
      location: { lat: 40.7125, lng: -74.0070, address: "Riverside Park playground" },
      priority: "high",
      reportedBy: "Emily L.",
      date: "2024-01-12"
    },
    {
      id: "CR-2024-0567",
      title: "Water leak on Oak Street",
      category: "Water & Drainage",
      status: "pending",
      location: { lat: 40.7145, lng: -74.0040, address: "Oak Street & 3rd Avenue" },
      priority: "high",
      reportedBy: "David K.",
      date: "2024-01-20"
    }
  ];

  const categories = [
    "Road & Traffic",
    "Street Lighting", 
    "Waste Management",
    "Water & Drainage",
    "Parks & Recreation",
    "Public Safety",
    "Building & Infrastructure"
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-pending text-pending-foreground";
      case "in-progress": return "bg-progress text-progress-foreground";
      case "resolved": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-destructive";
      case "medium": return "border-warning";
      case "low": return "border-muted";
      default: return "border-muted";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Timer className="w-4 h-4" />;
      case "in-progress": return <AlertCircle className="w-4 h-4" />;
      case "resolved": return <CheckCircle className="w-4 h-4" />;
      default: return <Timer className="w-4 h-4" />;
    }
  };

  const filteredIssues = issues.filter(issue => {
    const matchesCategory = selectedCategory === "all" || issue.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || issue.status === selectedStatus;
    return matchesCategory && matchesStatus;
  });

  const statusCounts = {
    pending: issues.filter(i => i.status === "pending").length,
    "in-progress": issues.filter(i => i.status === "in-progress").length,
    resolved: issues.filter(i => i.status === "resolved").length
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Issues Map</h1>
              <p className="text-muted-foreground">
                Interactive view of all reported civic issues in your area
              </p>
            </div>
            <Button className="btn-civic">
              Report New Issue
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Filters and Issues List */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Filter Controls */}
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Filters</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Status</label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Status Summary */}
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Status Overview</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Timer className="w-4 h-4 text-pending" />
                    <span className="text-sm">Pending</span>
                  </div>
                  <Badge variant="secondary">{statusCounts.pending}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-progress" />
                    <span className="text-sm">In Progress</span>
                  </div>
                  <Badge variant="secondary">{statusCounts["in-progress"]}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">Resolved</span>
                  </div>
                  <Badge variant="secondary">{statusCounts.resolved}</Badge>
                </div>
              </div>
            </Card>

            {/* Issues List */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Recent Issues ({filteredIssues.length})</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredIssues.map((issue) => (
                  <div
                    key={issue.id}
                    className={`p-3 rounded-lg border-l-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                      getPriorityColor(issue.priority)
                    } ${
                      selectedIssue?.id === issue.id ? "bg-primary/5" : "bg-background"
                    }`}
                    onClick={() => setSelectedIssue(issue)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm leading-tight">{issue.title}</h4>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(issue.status)}`}>
                        {getStatusIcon(issue.status)}
                        <span className="capitalize">{issue.status === "in-progress" ? "In Progress" : issue.status}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{issue.location.address}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="outline" className="text-xs">
                        {issue.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(issue.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Map Area */}
          <div className="lg:col-span-2">
            <Card className="h-full min-h-[600px]">
              <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-24 h-24 text-primary mx-auto mb-6 opacity-50" />
                  <h3 className="text-2xl font-bold mb-4">Interactive Map</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    This interactive map will show all reported issues with real-time updates. 
                    Integration with mapping services will be available with full backend connectivity.
                  </p>
                  {selectedIssue && (
                    <Card className="p-6 max-w-md mx-auto text-left">
                      <h4 className="font-semibold mb-2">{selectedIssue.title}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Reported: {new Date(selectedIssue.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{selectedIssue.location.address}</span>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <Badge variant="outline">{selectedIssue.category}</Badge>
                          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(selectedIssue.status)}`}>
                            {getStatusIcon(selectedIssue.status)}
                            <span className="capitalize">{selectedIssue.status === "in-progress" ? "In Progress" : selectedIssue.status}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuesMap;