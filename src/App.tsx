import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ReportIssue from "./pages/ReportIssue";
import MyReports from "./pages/MyReports";
import IssuesMap from "./pages/IssuesMap";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import ComplaintsList from "./pages/ComplaintsList";
import ComplaintDetail from "./pages/ComplaintDetail";
import DepartmentManagement from "./pages/DepartmentManagement";
import AnalyticsReports from "./pages/AnalyticsReports";
import NotificationManager from "./pages/NotificationManager";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<ReportIssue />} />
            <Route path="/reports" element={<MyReports />} />
            <Route path="/map" element={<IssuesMap />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/complaints" element={<ComplaintsList />} />
            <Route path="/admin/complaints/:id" element={<ComplaintDetail />} />
            <Route path="/admin/departments" element={<DepartmentManagement />} />
            <Route path="/admin/analytics" element={<AnalyticsReports />} />
            <Route path="/admin/notifications" element={<NotificationManager />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
