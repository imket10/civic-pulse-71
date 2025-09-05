import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar,
  MapPin,
  Clock,
  Users,
  FileText,
  AlertTriangle,
  CheckCircle,
  Target
} from "lucide-react";

const AnalyticsReports = () => {
  const [timeRange, setTimeRange] = useState("30d");
  const [department, setDepartment] = useState("all");

  // Mock analytics data - replace with Supabase data
  const analytics = {
    totalComplaints: 1247,
    resolvedComplaints: 1089,
    avgResolutionTime: 4.2,
    satisfactionRate: 4.6,
    categoryBreakdown: [
      { name: "Road & Traffic", count: 385, percentage: 31 },
      { name: "Street Lighting", count: 298, percentage: 24 },
      { name: "Waste Management", count: 234, percentage: 19 },
      { name: "Parks & Recreation", count: 187, percentage: 15 },
      { name: "Water Services", count: 143, percentage: 11 }
    ],
    monthlyTrends: [
      { month: "Jan", complaints: 98, resolved: 95 },
      { month: "Feb", complaints: 112, resolved: 108 },
      { month: "Mar", complaints: 127, resolved: 119 },
      { month: "Apr", complaints: 134, resolved: 128 },
      { month: "May", complaints: 156, resolved: 149 },
      { month: "Jun", complaints: 143, resolved: 138 }
    ],
    hotspots: [
      { area: "Downtown District", complaints: 89, trend: "up" },
      { area: "Industrial Zone", complaints: 76, trend: "down" },
      { area: "Residential North", complaints: 65, trend: "stable" },
      { area: "Shopping Center Area", complaints: 54, trend: "up" },
      { area: "Park District", complaints: 43, trend: "down" }
    ],
    departmentPerformance: [
      { name: "Public Works", active: 23, avgTime: 5.2, satisfaction: 4.3 },
      { name: "Electrical Services", active: 12, avgTime: 3.1, satisfaction: 4.7 },
      { name: "Sanitation", active: 18, avgTime: 2.8, satisfaction: 4.5 },
      { name: "Parks & Recreation", active: 15, avgTime: 4.5, satisfaction: 4.4 },
      { name: "Water Services", active: 8, avgTime: 6.1, satisfaction: 4.2 }
    ]
  };

  const handleExportPDF = () => {
    console.log("Exporting PDF report...");
  };

  const handleExportExcel = () => {
    console.log("Exporting Excel report...");
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-destructive" />;
      case "down": return <TrendingUp className="w-4 h-4 text-success rotate-180" />;
      default: return <div className="w-4 h-4 bg-muted rounded-full" />;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Analytics & Reports</h1>
              <p className="text-muted-foreground">
                Track performance metrics and generate detailed reports
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 3 months</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="public-works">Public Works</SelectItem>
                  <SelectItem value="electrical">Electrical Services</SelectItem>
                  <SelectItem value="sanitation">Sanitation</SelectItem>
                  <SelectItem value="parks">Parks & Recreation</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleExportPDF}>
                  <Download className="w-4 h-4 mr-2" />
                  PDF
                </Button>
                <Button variant="outline" onClick={handleExportExcel}>
                  <Download className="w-4 h-4 mr-2" />
                  Excel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center">
            <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{analytics.totalComplaints}</div>
            <div className="text-sm text-muted-foreground">Total Complaints</div>
            <div className="text-xs text-success mt-1">+12% from last month</div>
          </Card>
          <Card className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold">{analytics.resolvedComplaints}</div>
            <div className="text-sm text-muted-foreground">Resolved</div>
            <div className="text-xs text-success mt-1">87% resolution rate</div>
          </Card>
          <Card className="p-4 text-center">
            <Clock className="w-8 h-8 text-warning mx-auto mb-2" />
            <div className="text-2xl font-bold">{analytics.avgResolutionTime}d</div>
            <div className="text-sm text-muted-foreground">Avg Resolution</div>
            <div className="text-xs text-success mt-1">-0.8d improvement</div>
          </Card>
          <Card className="p-4 text-center">
            <Target className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{analytics.satisfactionRate}/5</div>
            <div className="text-sm text-muted-foreground">Satisfaction</div>
            <div className="text-xs text-success mt-1">+0.2 from last month</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Complaints by Category */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Complaints by Category</h3>
            </div>
            <div className="space-y-4">
              {analytics.categoryBreakdown.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{category.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{category.count}</span>
                      <Badge variant="outline" className="text-xs">
                        {category.percentage}%
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Monthly Trends */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Monthly Trends</h3>
            </div>
            <div className="space-y-4">
              {analytics.monthlyTrends.map((month, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{month.month}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-primary">{month.complaints}</div>
                      <div className="text-xs text-muted-foreground">Reported</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-success">{month.resolved}</div>
                      <div className="text-xs text-muted-foreground">Resolved</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Hotspot Areas */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Complaint Hotspots</h3>
            </div>
            <div className="space-y-3">
              {analytics.hotspots.map((hotspot, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{hotspot.area}</h4>
                      <p className="text-sm text-muted-foreground">{hotspot.complaints} complaints</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(hotspot.trend)}
                    <Badge 
                      variant={hotspot.trend === "up" ? "destructive" : hotspot.trend === "down" ? "default" : "secondary"}
                      className="capitalize"
                    >
                      {hotspot.trend}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Department Performance */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Users className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Department Performance</h3>
            </div>
            <div className="space-y-3">
              {analytics.departmentPerformance.map((dept, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{dept.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {dept.active} active
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg Resolution:</span>
                      <span className="font-medium">{dept.avgTime}d</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Satisfaction:</span>
                      <span className="font-medium text-success">{dept.satisfaction}/5</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Report Generation */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Generate Custom Report</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Report Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="summary">Summary Report</SelectItem>
                <SelectItem value="detailed">Detailed Analysis</SelectItem>
                <SelectItem value="department">Department Performance</SelectItem>
                <SelectItem value="citizen">Citizen Satisfaction</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 3 months</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Document</SelectItem>
                <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                <SelectItem value="csv">CSV File</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Custom reports include detailed breakdowns, charts, and recommendations based on your selected criteria.</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsReports;