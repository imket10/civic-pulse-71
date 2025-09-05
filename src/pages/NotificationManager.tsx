import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Send, 
  Bell, 
  Mail, 
  MessageSquare,
  Users,
  Calendar,
  Check,
  Clock,
  AlertTriangle,
  Plus,
  Filter
} from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "sms" | "email" | "push" | "all";
  recipients: string[];
  status: "sent" | "scheduled" | "draft" | "failed";
  sentDate: string;
  complaintIds?: string[];
  deliveryRate?: number;
}

const NotificationManager = () => {
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

  // Mock data - replace with Supabase data
  const notifications: Notification[] = [
    {
      id: "notif-1",
      title: "Pothole Repair Update",
      message: "Your reported pothole on Main Street has been scheduled for repair on January 25th. Thank you for your patience.",
      type: "sms",
      recipients: ["john.doe@email.com"],
      status: "sent",
      sentDate: "2024-01-20T10:30:00",
      complaintIds: ["CR-2024-1001"],
      deliveryRate: 100
    },
    {
      id: "notif-2", 
      title: "Weekly Maintenance Notice",
      message: "Scheduled maintenance in your area will take place this weekend. Temporary service disruptions may occur.",
      type: "email",
      recipients: ["bulk-residents"],
      status: "scheduled",
      sentDate: "2024-01-22T08:00:00",
      deliveryRate: 95
    },
    {
      id: "notif-3",
      title: "Streetlight Repair Completed",
      message: "The streetlight issue you reported at Park Avenue has been successfully resolved. Thank you for making your community safer!",
      type: "all",
      recipients: ["sarah.m@email.com"],
      status: "sent", 
      sentDate: "2024-01-18T16:45:00",
      complaintIds: ["CR-2024-0892"],
      deliveryRate: 100
    },
    {
      id: "notif-4",
      title: "Emergency Road Closure",
      message: "URGENT: Main Street will be closed for emergency repairs from 6 AM to 2 PM tomorrow due to a water main break.",
      type: "push",
      recipients: ["all-citizens"],
      status: "draft",
      sentDate: "2024-01-21T00:00:00"
    }
  ];

  const recipientGroups = [
    { id: "all-citizens", name: "All Citizens", count: 12458 },
    { id: "downtown-residents", name: "Downtown Residents", count: 3241 },
    { id: "bulk-residents", name: "Bulk Notification List", count: 8967 },
    { id: "frequent-reporters", name: "Frequent Reporters", count: 156 }
  ];

  const handleSendNotification = () => {
    // This will need Supabase integration
    setIsComposeOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent": return "bg-success text-success-foreground";
      case "scheduled": return "bg-warning text-warning-foreground";
      case "draft": return "bg-muted text-muted-foreground";
      case "failed": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "sms": return <MessageSquare className="w-4 h-4" />;
      case "email": return <Mail className="w-4 h-4" />;
      case "push": return <Bell className="w-4 h-4" />;
      case "all": return <Send className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesStatus = filterStatus === "all" || notification.status === filterStatus;
    const matchesType = filterType === "all" || notification.type === filterType;
    return matchesStatus && matchesType;
  });

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Notification Manager</h1>
              <p className="text-muted-foreground">
                Send alerts and updates to citizens about their complaints
              </p>
            </div>
            <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Compose Notification
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Send New Notification</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="notif-title">Title</Label>
                      <Input id="notif-title" placeholder="Notification title" />
                    </div>
                    <div>
                      <Label htmlFor="notif-type">Delivery Method</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sms">SMS Only</SelectItem>
                          <SelectItem value="email">Email Only</SelectItem>
                          <SelectItem value="push">Push Notification</SelectItem>
                          <SelectItem value="all">All Methods</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="notif-message">Message</Label>
                    <Textarea 
                      id="notif-message" 
                      placeholder="Enter your message..."
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label>Recipients</Label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      {recipientGroups.map((group) => (
                        <div key={group.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={group.id}
                            checked={selectedRecipients.includes(group.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedRecipients([...selectedRecipients, group.id]);
                              } else {
                                setSelectedRecipients(selectedRecipients.filter(id => id !== group.id));
                              }
                            }}
                          />
                          <Label htmlFor={group.id} className="flex-1">
                            <div>
                              <div className="font-medium">{group.name}</div>
                              <div className="text-xs text-muted-foreground">{group.count.toLocaleString()} recipients</div>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Label htmlFor="schedule-date">Schedule for later (optional)</Label>
                      <Input id="schedule-date" type="datetime-local" />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleSendNotification} className="flex-1">
                      <Send className="w-4 h-4 mr-2" />
                      Send Now
                    </Button>
                    <Button variant="outline" onClick={() => console.log("Save as draft")}>
                      Save Draft
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center">
            <Send className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{notifications.filter(n => n.status === "sent").length}</div>
            <div className="text-sm text-muted-foreground">Sent Today</div>
          </Card>
          <Card className="p-4 text-center">
            <Clock className="w-8 h-8 text-warning mx-auto mb-2" />
            <div className="text-2xl font-bold">{notifications.filter(n => n.status === "scheduled").length}</div>
            <div className="text-sm text-muted-foreground">Scheduled</div>
          </Card>
          <Card className="p-4 text-center">
            <Users className="w-8 h-8 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold">12.4K</div>
            <div className="text-sm text-muted-foreground">Total Recipients</div>
          </Card>
          <Card className="p-4 text-center">
            <Check className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">98.5%</div>
            <div className="text-sm text-muted-foreground">Delivery Rate</div>
          </Card>
        </div>

        <Tabs defaultValue="notifications" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="notifications">All Notifications</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="recipients">Recipient Groups</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-6">
            {/* Filters */}
            <Card className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="md:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="md:w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="push">Push Notification</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>

            {/* Notifications List */}
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <Card key={notification.id} className="p-6">
                  <div className="flex flex-col lg:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(notification.type)}
                            <h3 className="text-lg font-semibold">{notification.title}</h3>
                          </div>
                          <Badge className={getStatusColor(notification.status)}>
                            {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {notification.message}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>
                            {notification.status === "scheduled" ? "Scheduled: " : "Sent: "}
                            {new Date(notification.sentDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>
                            {Array.isArray(notification.recipients) 
                              ? `${notification.recipients.length} recipients`
                              : notification.recipients
                            }
                          </span>
                        </div>
                        {notification.deliveryRate && (
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-muted-foreground" />
                            <span>{notification.deliveryRate}% delivered</span>
                          </div>
                        )}
                      </div>

                      {notification.complaintIds && (
                        <div className="mt-3">
                          <span className="text-sm text-muted-foreground">Related complaints: </span>
                          {notification.complaintIds.map(id => (
                            <Badge key={id} variant="outline" className="ml-2 text-xs">
                              {id}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 lg:w-48">
                      <Button size="sm" variant="outline" className="w-full">
                        View Details
                      </Button>
                      {notification.status === "draft" && (
                        <Button size="sm" className="w-full">
                          <Send className="w-3 h-3 mr-1" />
                          Send Now
                        </Button>
                      )}
                      {notification.status === "scheduled" && (
                        <Button size="sm" variant="outline" className="w-full">
                          <Clock className="w-3 h-3 mr-1" />
                          Reschedule
                        </Button>
                      )}
                      {notification.status === "sent" && (
                        <Button size="sm" variant="outline" className="w-full">
                          <Send className="w-3 h-3 mr-1" />
                          Send Again
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Notification Templates</h3>
              <div className="grid gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Status Update Template</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    "Your complaint [COMPLAINT_ID] has been updated to [STATUS]. [CUSTOM_MESSAGE]"
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="outline">Use Template</Button>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Resolution Notice Template</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    "Great news! Your reported issue at [LOCATION] has been resolved. Thank you for helping improve our community."
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="outline">Use Template</Button>
                  </div>
                </div>
                <Button className="w-fit">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Template
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="recipients" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recipient Groups</h3>
              <div className="space-y-4">
                {recipientGroups.map((group) => (
                  <div key={group.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{group.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {group.count.toLocaleString()} members
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Users className="w-3 h-3 mr-1" />
                        Manage
                      </Button>
                      <Button size="sm" variant="outline">
                        <Send className="w-3 h-3 mr-1" />
                        Send To Group
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NotificationManager;