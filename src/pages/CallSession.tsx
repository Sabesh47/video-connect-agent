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
  Home,
  ChevronDown,
  ChevronUp,
  Upload,
  Scan,
  Eye
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
      description: "Cross-verify with document dates and customer response"
    },
    {
      id: "pincode",
      title: "Confirm your Pin Code",
      icon: MapPin,
      description: "Validate against address documents and location data"
    },
    {
      id: "location",
      title: "Location Check",
      icon: MapPin,
      description: "Checks Latitude and longitude automatically via GPS access"
    },
    {
      id: "pancard",
      title: "Pancard Live Validation",
      icon: CreditCard,
      description: "User shows pancard to camera and agent clicks it, the backend OCR process will extract the details"
    },
    {
      id: "selfie",
      title: "Selfie Capture",
      icon: Camera,
      description: "Liveliness check, the pic again clicked by the agent"
    },
    {
      id: "facecompare",
      title: "Face Compare vs Pan Card",
      icon: User,
      description: "AI-powered facial recognition matching with PAN card photo"
    },
    {
      id: "panaadhaar",
      title: "Pan vs Aadhaar Compare",
      icon: FileCheck,
      description: "Comparing all details if it match from name, DOB, address, etc"
    },
    {
      id: "proofaddress",
      title: "Proof of Address",
      icon: Home,
      description: "Other government IDs verification for address confirmation"
    },
    {
      id: "supporting",
      title: "Supporting Document",
      icon: FileText,
      description: "Udyam registration etc and other business documents"
    }
  ];

  const [verificationStatus, setVerificationStatus] = useState(
    verificationProcesses.reduce((acc, process) => ({
      ...acc,
      [process.id]: 'pending'
    }), {})
  );

  const [expandedProcess, setExpandedProcess] = useState<string | null>(null);

  const handleVerificationChange = (processId: string, status: 'pass' | 'fail') => {
    setVerificationStatus(prev => ({
      ...prev,
      [processId]: status
    }));
  };

  const toggleProcessExpanded = (processId: string) => {
    setExpandedProcess(expandedProcess === processId ? null : processId);
  };

  const renderExpandedContent = (processId: string) => {
    switch (processId) {
      case 'dob':
        return (
          <div className="mt-3 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-muted-foreground">Document DOB</label>
                <Input className="h-8 text-xs" value="15/08/1990" readOnly />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Customer Response</label>
                <Input className="h-8 text-xs" placeholder="Enter DOB" />
              </div>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <CheckCircle className="h-3 w-3 text-success" />
              <span className="text-success">DOB matches document</span>
            </div>
          </div>
        );
      
      case 'pincode':
        return (
          <div className="mt-3 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-muted-foreground">Address PIN</label>
                <Input className="h-8 text-xs" value="400001" readOnly />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Customer PIN</label>
                <Input className="h-8 text-xs" placeholder="Enter PIN" />
              </div>
            </div>
          </div>
        );
      
      case 'location':
        return (
          <div className="mt-3 space-y-3">
            <div className="bg-muted/50 rounded p-2">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="h-3 w-3 text-primary" />
                <span className="text-xs font-medium">GPS Location</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>Lat: 19.0760</div>
                <div>Lng: 72.8777</div>
              </div>
              <div className="text-xs text-muted-foreground mt-1">Mumbai, Maharashtra</div>
            </div>
            <Button size="sm" className="w-full h-7 text-xs">
              <Scan className="h-3 w-3 mr-1" />
              Refresh Location
            </Button>
          </div>
        );
      
      case 'pancard':
        return (
          <div className="mt-3 space-y-3">
            <div className="bg-gradient-hero rounded p-3 text-center">
              <Camera className="h-6 w-6 mx-auto mb-1 text-white" />
              <p className="text-xs text-white">Live Camera Feed</p>
            </div>
            <div className="space-y-2">
              <Button size="sm" className="w-full h-7 text-xs">
                <Camera className="h-3 w-3 mr-1" />
                Capture PAN Card
              </Button>
              <div className="bg-muted/50 rounded p-2">
                <div className="text-xs font-medium mb-1">OCR Results:</div>
                <div className="text-xs space-y-1">
                  <div>Name: JOHN DOE</div>
                  <div>PAN: ABCDE1234F</div>
                  <div>DOB: 15/08/1990</div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'selfie':
        return (
          <div className="mt-3 space-y-3">
            <div className="bg-gradient-hero rounded p-3 text-center">
              <User className="h-6 w-6 mx-auto mb-1 text-white" />
              <p className="text-xs text-white">Customer Live View</p>
            </div>
            <div className="space-y-2">
              <Button size="sm" className="w-full h-7 text-xs">
                <Camera className="h-3 w-3 mr-1" />
                Capture Selfie
              </Button>
              <div className="flex items-center space-x-2 text-xs">
                <CheckCircle className="h-3 w-3 text-success" />
                <span className="text-success">Liveness detected</span>
              </div>
            </div>
          </div>
        );
      
      case 'facecompare':
        return (
          <div className="mt-3 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-center">
                <div className="bg-muted rounded p-2 mb-1">
                  <User className="h-4 w-4 mx-auto" />
                </div>
                <span className="text-xs">Live Photo</span>
              </div>
              <div className="text-center">
                <div className="bg-muted rounded p-2 mb-1">
                  <CreditCard className="h-4 w-4 mx-auto" />
                </div>
                <span className="text-xs">PAN Photo</span>
              </div>
            </div>
            <div className="bg-success/10 rounded p-2 text-center">
              <span className="text-xs text-success font-medium">Match: 94%</span>
            </div>
          </div>
        );
      
      case 'panaadhaar':
        return (
          <div className="mt-3 space-y-3">
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="font-medium">PAN Details</div>
                <div className="font-medium">Aadhaar Details</div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>JOHN DOE</div>
                <div>JOHN DOE ✓</div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>15/08/1990</div>
                <div>15/08/1990 ✓</div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>Mumbai, MH</div>
                <div>Mumbai, MH ✓</div>
              </div>
            </div>
          </div>
        );
      
      case 'proofaddress':
        return (
          <div className="mt-3 space-y-3">
            <div className="border-2 border-dashed rounded p-3 text-center">
              <Upload className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Upload Address Proof</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span>Electricity Bill</span>
                <Eye className="h-3 w-3 text-primary" />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>Voter ID</span>
                <Eye className="h-3 w-3 text-primary" />
              </div>
            </div>
          </div>
        );
      
      case 'supporting':
        return (
          <div className="mt-3 space-y-3">
            <div className="border-2 border-dashed rounded p-3 text-center">
              <Upload className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Upload Supporting Documents</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span>Udyam Registration</span>
                <Eye className="h-3 w-3 text-primary" />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>Business License</span>
                <Eye className="h-3 w-3 text-primary" />
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
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
                      const isExpanded = expandedProcess === process.id;
                      
                      return (
                        <div key={process.id} className="border rounded-lg">
                          <div 
                            className="p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                            onClick={() => toggleProcessExpanded(process.id)}
                          >
                            <div className="flex items-start space-x-2">
                              <div className="bg-primary/10 rounded-full p-1.5 mt-0.5">
                                <process.icon className="h-3 w-3 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-xs mb-1 leading-tight">{process.title}</h4>
                                  <div className="flex items-center space-x-1">
                                    {status !== 'pending' && (
                                      <div className={`w-2 h-2 rounded-full ${
                                        status === 'pass' ? 'bg-success' : 'bg-danger'
                                      }`}></div>
                                    )}
                                    {isExpanded ? (
                                      <ChevronUp className="h-3 w-3 text-muted-foreground" />
                                    ) : (
                                      <ChevronDown className="h-3 w-3 text-muted-foreground" />
                                    )}
                                  </div>
                                </div>
                                <p className="text-xs text-muted-foreground leading-tight">{process.description}</p>
                              </div>
                            </div>
                          </div>

                          {isExpanded && (
                            <div className="border-t p-3">
                              {renderExpandedContent(process.id)}
                              
                              {/* Pass/Fail buttons */}
                              <div className="flex space-x-2 mt-3">
                                <Button
                                  variant={status === 'pass' ? 'default' : 'outline'}
                                  size="sm"
                                  onClick={() => handleVerificationChange(process.id, 'pass')}
                                  className={`flex-1 h-8 text-xs ${
                                    status === 'pass' 
                                      ? 'bg-success hover:bg-success/90 text-success-foreground' 
                                      : 'border-success/20 hover:bg-success/10'
                                  }`}
                                >
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Pass
                                </Button>
                                <Button
                                  variant={status === 'fail' ? 'default' : 'outline'}
                                  size="sm"
                                  onClick={() => handleVerificationChange(process.id, 'fail')}
                                  className={`flex-1 h-8 text-xs ${
                                    status === 'fail' 
                                      ? 'bg-danger hover:bg-danger/90 text-danger-foreground' 
                                      : 'border-danger/20 hover:bg-danger/10'
                                  }`}
                                >
                                  <XCircle className="h-3 w-3 mr-1" />
                                  Fail
                                </Button>
                              </div>
                            </div>
                          )}
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