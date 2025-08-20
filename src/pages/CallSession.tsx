import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  PhoneOff, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Clock,
  User,
  FileText,
  LogOut,
  CheckCircle,
  XCircle,
  Calendar,
  MapPin,
  CreditCard,
  Camera,
  FileCheck,
  Home
} from "lucide-react";

const CallSession = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("type") || "agent";
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState("05:32");

  // Verification processes data
  const verificationProcesses = [
    {
      id: "dob",
      title: "Confirm your Date of Birth",
      icon: Calendar,
      description: "Verify customer's date of birth matches their documents"
    },
    {
      id: "pincode",
      title: "Confirm your Pin Code",
      icon: MapPin,
      description: "Verify customer's pin code matches their address"
    },
    {
      id: "location",
      title: "Location Check",
      icon: MapPin,
      description: "Automatically checks latitude and longitude via GPS access"
    },
    {
      id: "pancard",
      title: "Pancard Live Validation",
      icon: CreditCard,
      description: "Customer shows PAN card to camera, OCR extracts details"
    },
    {
      id: "selfie",
      title: "Selfie Capture",
      icon: Camera,
      description: "Liveliness check - agent captures customer's photo"
    },
    {
      id: "facecompare",
      title: "Face Compare vs Pan Card",
      icon: User,
      description: "Compare customer's face with PAN card photo"
    },
    {
      id: "panaadhaar",
      title: "Pan vs Aadhaar Compare",
      icon: FileCheck,
      description: "Compare details between PAN and Aadhaar (name, DOB, address)"
    },
    {
      id: "proofaddress",
      title: "Proof of Address",
      icon: Home,
      description: "Verify other government IDs for address proof"
    },
    {
      id: "supporting",
      title: "Supporting Document",
      icon: FileText,
      description: "Verify supporting documents (Udyam registration, etc.)"
    }
  ];

  const [verificationStatus, setVerificationStatus] = useState(
    verificationProcesses.reduce((acc, process) => ({
      ...acc,
      [process.id]: 'pending'
    }), {})
  );

  const handleVerificationChange = (processId: string, status: 'pass' | 'fail') => {
    setVerificationStatus(prev => ({
      ...prev,
      [processId]: status
    }));
  };

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
            {/* Document Verification - Only show for agents */}
            {userType === "agent" && (
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Document Verification</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="max-h-96 overflow-y-auto space-y-4">
                    {/* Progress Summary */}
                    <div className="bg-muted rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium">Progress</span>
                        <span className="text-xs text-muted-foreground">
                          {Object.values(verificationStatus).filter(status => status !== 'pending').length}/9
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-success rounded-full"></div>
                          <span className="text-xs">{Object.values(verificationStatus).filter(status => status === 'pass').length}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-danger rounded-full"></div>
                          <span className="text-xs">{Object.values(verificationStatus).filter(status => status === 'fail').length}</span>
                        </div>
                      </div>
                    </div>

                    {/* Verification Processes */}
                    {verificationProcesses.map((process) => {
                      const status = verificationStatus[process.id];
                      
                      return (
                        <div key={process.id} className="border rounded-lg p-3">
                          <div className="flex items-start space-x-2 mb-2">
                            <div className="bg-primary/10 rounded-full p-1.5 mt-0.5">
                              <process.icon className="h-3 w-3 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-xs mb-1 leading-tight">{process.title}</h4>
                              <p className="text-xs text-muted-foreground leading-tight">{process.description}</p>
                            </div>
                          </div>
                          
                          <div className="flex space-x-1">
                            <Button
                              variant={status === 'pass' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => handleVerificationChange(process.id, 'pass')}
                              className={`flex-1 h-7 text-xs ${
                                status === 'pass' 
                                  ? 'bg-success hover:bg-success/90 text-success-foreground' 
                                  : 'border-success/20 hover:bg-success/10'
                              }`}
                            >
                              <CheckCircle className="h-2.5 w-2.5 mr-1" />
                              Pass
                            </Button>
                            <Button
                              variant={status === 'fail' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => handleVerificationChange(process.id, 'fail')}
                              className={`flex-1 h-7 text-xs ${
                                status === 'fail' 
                                  ? 'bg-danger hover:bg-danger/90 text-danger-foreground' 
                                  : 'border-danger/20 hover:bg-danger/10'
                              }`}
                            >
                              <XCircle className="h-2.5 w-2.5 mr-1" />
                              Fail
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

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
          </div>
        </div>
      </div>

    </div>
  );
};

export default CallSession;