import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PermissionModal } from "@/components/PermissionModal";
import { 
  Video, 
  FileText, 
  Clock, 
  CheckCircle, 
  User, 
  LogOut,
  Phone,
  Shield,
  Upload,
  MessageCircle,
  Calendar
} from "lucide-react";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [kycStatus, setKycStatus] = useState("pending");

  const handleStartKYC = () => {
    setShowPermissionModal(true);
  };

  const handlePermissionGranted = () => {
    setShowPermissionModal(false);
    navigate("/call-session?type=customer");
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const stats = [
    {
      title: "KYC Status",
      value: "Pending",
      icon: Shield,
      color: "text-warning"
    },
    {
      title: "Documents",
      value: "3/3",
      icon: FileText,
      color: "text-success"
    },
    {
      title: "Verification",
      value: "Not Started",
      icon: Video,
      color: "text-muted-foreground"
    },
    {
      title: "Estimated Time",
      value: "5-10 min",
      icon: Clock,
      color: "text-primary"
    }
  ];

  const documents = [
    { name: "Aadhaar Card", status: "uploaded", uploadedAt: "2 hours ago" },
    { name: "PAN Card", status: "uploaded", uploadedAt: "2 hours ago" },
    { name: "Bank Statement", status: "uploaded", uploadedAt: "1 hour ago" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Customer Portal</h1>
            <Badge variant="secondary" className="bg-gradient-primary">
              KYC Process
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span className="font-medium">John Doe</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* KYC Process Card */}
        <Card className="mb-8 shadow-medium border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Video className="h-6 w-6 text-primary" />
                <span>Video KYC Verification</span>
              </div>
              <Badge 
                variant={kycStatus === "completed" ? "default" : "secondary"}
                className={kycStatus === "completed" ? "bg-success" : "bg-warning"}
              >
                {kycStatus === "completed" ? "Completed" : "Pending"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Complete your KYC verification through a secure video call with our agent. 
              The process typically takes 5-10 minutes.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">What you'll need:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Good internet connection</li>
                  <li>• Well-lit environment</li>
                  <li>• All required documents</li>
                  <li>• Clear audio and video</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Expected duration:</h4>
                <p className="text-sm text-muted-foreground">
                  The verification call usually takes 5-10 minutes. Our agent will 
                  guide you through the process step by step.
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button 
                onClick={handleStartKYC}
                className="bg-gradient-primary hover:opacity-90"
                size="lg"
                disabled={kycStatus === "completed"}
              >
                <Video className="h-5 w-5 mr-2" />
                {kycStatus === "completed" ? "KYC Completed" : "Start Video KYC"}
              </Button>
              <Button variant="outline" size="lg">
                <MessageCircle className="h-5 w-5 mr-2" />
                Chat Support
              </Button>
            </div>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Documents */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Required Documents</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-success/10 rounded-full">
                        <CheckCircle className="h-4 w-4 text-success" />
                      </div>
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Uploaded {doc.uploadedAt}
                        </p>
                      </div>
                    </div>
                    <Badge variant="default" className="bg-success">
                      Uploaded
                    </Badge>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Additional Documents
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Contact Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="phone">Mobile Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value="+91 98765 43210"
                  readOnly
                  className="bg-muted"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value="john.doe@example.com"
                  readOnly
                  className="bg-muted"
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value="123 Main Street, City, State - 123456"
                  readOnly
                  className="bg-muted"
                />
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">Need Help?</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Support: 1800-XXX-XXXX
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Live Chat Support
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule a Call
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <PermissionModal
        isOpen={showPermissionModal}
        onClose={() => setShowPermissionModal(false)}
        onPermissionGranted={handlePermissionGranted}
      />
    </div>
  );
};

export default CustomerDashboard;