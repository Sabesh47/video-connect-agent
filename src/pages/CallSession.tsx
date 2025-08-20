import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DocumentVerificationModal } from "@/components/DocumentVerificationModal";
import { 
  PhoneOff, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  HelpCircle,
  Clock,
  User,
  FileText,
  LogOut
} from "lucide-react";

const CallSession = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("type") || "agent";
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [callDuration, setCallDuration] = useState("05:32");

  const handleEndCall = () => {
    if (userType === "customer") {
      navigate("/customer-portal");
    } else {
      navigate("/dashboard");
    }
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const customerInfo = {
    name: "John Doe",
    id: "KYC-2024-001",
    status: "In Verification",
    documents: ["Aadhaar Card", "PAN Card", "Bank Statement"]
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">Video KYC Session</h1>
            <Badge className="bg-gradient-primary">Active</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="h-4 w-4" />
              <span>{callDuration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Area */}
          <div className="lg:col-span-2 space-y-4">
            {/* Customer Video */}
            <Card className="shadow-medium">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Customer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-hero rounded-lg flex items-center justify-center relative">
                  <div className="text-center text-white">
                    <User className="h-16 w-16 mx-auto mb-2 opacity-50" />
                    <p className="text-lg font-medium">{customerInfo.name}</p>
                    <p className="text-sm opacity-75">Video Stream Active</p>
                  </div>
                  {!isVideoOff && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="bg-success text-success-foreground">
                        HD
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Agent Video (Picture-in-Picture) */}
            <Card className="shadow-soft">
              <CardContent className="p-3">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative max-w-xs">
                  <div className="text-center">
                    <User className="h-8 w-8 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-sm font-medium">You</p>
                    <p className="text-xs text-muted-foreground">Agent View</p>
                  </div>
                  {isVideoOff && (
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                      <VideoOff className="h-6 w-6 text-white" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Controls */}
            <Card className="shadow-soft">
              <CardContent className="p-4">
                <div className="flex items-center justify-center space-x-4">
                  <Button
                    variant={isMuted ? "destructive" : "outline"}
                    size="lg"
                    onClick={() => setIsMuted(!isMuted)}
                    className="rounded-full"
                  >
                    {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </Button>
                  
                  <Button
                    variant={isVideoOff ? "destructive" : "outline"}
                    size="lg"
                    onClick={() => setIsVideoOff(!isVideoOff)}
                    className="rounded-full"
                  >
                    {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                  </Button>
                  
                  <Button
                    variant="destructive"
                    size="lg"
                    onClick={handleEndCall}
                    className="rounded-full bg-danger hover:bg-danger/90"
                  >
                    <PhoneOff className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customer Info & Documents */}
          <div className="space-y-6">
            {/* Customer Info */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Customer Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{customerInfo.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">KYC ID</p>
                  <p className="font-medium">{customerInfo.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant="secondary">{customerInfo.status}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Documents</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {customerInfo.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm font-medium">{doc}</span>
                      <Badge variant="outline" className="text-xs">
                        Uploaded
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions - Only show for agents */}
            {userType === "agent" && (
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setShowVerification(true)}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Document Verification
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Document Verification Modal - Only for agents */}
      {userType === "agent" && (
        <>
          <DocumentVerificationModal 
            isOpen={showVerification}
            onClose={() => setShowVerification(false)}
          />

          {/* Floating Verification Button */}
          <div className="fixed bottom-6 right-6">
            <Button
              size="lg"
              onClick={() => setShowVerification(true)}
              className="rounded-full shadow-strong bg-gradient-primary hover:opacity-90"
            >
              <FileText className="h-6 w-6" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CallSession;