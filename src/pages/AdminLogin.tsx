import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Lock, User, Building } from "lucide-react";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    role: ""
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // This will need Supabase authentication
    console.log("Login attempt:", credentials);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Municipal Admin Portal</h1>
          <p className="text-muted-foreground">Sign in to manage civic reports</p>
        </div>

        <Alert className="mb-6 border-warning/20 bg-warning/5">
          <Lock className="h-4 w-4" />
          <AlertDescription className="text-sm">
            <strong>Demo Mode:</strong> Connect to Supabase for full authentication functionality
          </AlertDescription>
        </Alert>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@municipality.gov"
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Role
            </Label>
            <Select value={credentials.role} onValueChange={(value) => setCredentials({...credentials, role: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">System Administrator</SelectItem>
                <SelectItem value="dept-head">Department Head</SelectItem>
                <SelectItem value="staff">Staff Member</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Need access? Contact your system administrator
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;