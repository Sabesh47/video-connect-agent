import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  PhoneCall, 
  PhoneCallIcon, 
  Clock, 
  CheckCircle, 
  User, 
  LogOut,
  Bell
} from "lucide-react";
import { PermissionModal } from "@/components/PermissionModal";

const Dashboard = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  const handleToggleOnline = (checked: boolean) => {
    if (checked) {
      setShowPermissionModal(true);
    } else {
      setIsOnline(false);
    }
  };

  const handlePermissionGranted = () => {
    setIsOnline(true);
    setShowPermissionModal(false);
  };

  const stats = [
    {
      title: "Calls Received",
      value: "24",
      icon: PhoneCall,
      color: "text-primary"
    },
    {
      title: "Calls Completed",
      value: "22",
      icon: CheckCircle,
      color: "text-success"
    },
    {
      title: "Average Duration",
      value: "8:45",
      icon: Clock,
      color: "text-secondary"
    },
    {
      title: "Success Rate",
      value: "91.7%",
      icon: CheckCircle,
      color: "text-success"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Agent Dashboard</h1>
            <Badge variant={isOnline ? "default" : "secondary"} className="bg-gradient-primary">
              {isOnline ? "Online" : "Offline"}
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span className="font-medium">Agent Smith</span>
            </div>
            <Button variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Status Toggle */}
        <Card className="mb-8 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Availability Status
              <div className="flex items-center space-x-3">
                <span className={`text-sm ${isOnline ? 'text-success' : 'text-muted-foreground'}`}>
                  {isOnline ? 'Online' : 'Offline'}
                </span>
                <Switch
                  checked={isOnline}
                  onCheckedChange={handleToggleOnline}
                  className="data-[state=checked]:bg-success"
                />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {isOnline 
                ? "You are available to receive customer calls for video KYC verification." 
                : "Toggle online to start receiving customer calls. We'll check your system permissions first."
              }
            </p>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="shadow-soft hover:shadow-medium transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-2 rounded-lg bg-gradient-subtle ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Calls */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Recent Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((call) => (
                <div key={call} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <PhoneCallIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Customer #{1000 + call}</p>
                      <p className="text-sm text-muted-foreground">
                        {call === 1 ? "2 minutes ago" : `${call * 15} minutes ago`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={call <= 2 ? "default" : "secondary"}>
                      {call <= 2 ? "Completed" : "In Progress"}
                    </Badge>
                    {call === 1 && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => window.location.href = '/call-session'}
                      >
                        Join Call
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <PermissionModal
        isOpen={showPermissionModal}
        onClose={() => setShowPermissionModal(false)}
        onPermissionGranted={handlePermissionGranted}
      />
    </div>
  );
};

export default Dashboard;