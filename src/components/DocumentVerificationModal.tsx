import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  CheckCircle, 
  XCircle, 
  Calendar,
  MapPin,
  CreditCard,
  Camera,
  User,
  FileCheck,
  FileText,
  Home
} from "lucide-react";

interface DocumentVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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

type ProcessStatus = 'pending' | 'pass' | 'fail';

export const DocumentVerificationModal = ({ isOpen, onClose }: DocumentVerificationModalProps) => {
  const [processStatus, setProcessStatus] = useState<Record<string, ProcessStatus>>(
    verificationProcesses.reduce((acc, process) => ({
      ...acc,
      [process.id]: 'pending'
    }), {})
  );
  const [notes, setNotes] = useState("");

  const handleStatusChange = (processId: string, status: ProcessStatus) => {
    setProcessStatus(prev => ({
      ...prev,
      [processId]: status
    }));
  };

  const getStatusIcon = (status: ProcessStatus) => {
    switch (status) {
      case 'pass': return CheckCircle;
      case 'fail': return XCircle;
      default: return null;
    }
  };

  const getStatusColor = (status: ProcessStatus) => {
    switch (status) {
      case 'pass': return 'text-success';
      case 'fail': return 'text-danger';
      default: return 'text-muted-foreground';
    }
  };

  const handleSubmit = () => {
    console.log("Verification results:", processStatus);
    console.log("Notes:", notes);
    onClose();
  };

  const completedProcesses = Object.values(processStatus).filter(status => status !== 'pending').length;
  const passedProcesses = Object.values(processStatus).filter(status => status === 'pass').length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileCheck className="h-5 w-5" />
            <span>Document Verification Process</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Progress Summary */}
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Verification Progress</span>
              <span className="text-sm text-muted-foreground">
                {completedProcesses}/{verificationProcesses.length} completed
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-success text-success-foreground">
                {passedProcesses} Passed
              </Badge>
              <Badge variant="secondary" className="bg-danger text-danger-foreground">
                {completedProcesses - passedProcesses} Failed
              </Badge>
              <Badge variant="outline">
                {verificationProcesses.length - completedProcesses} Pending
              </Badge>
            </div>
          </div>

          {/* Verification Processes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {verificationProcesses.map((process) => {
              const status = processStatus[process.id];
              const StatusIcon = getStatusIcon(status);
              
              return (
                <Card key={process.id} className="shadow-soft">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3 mb-3">
                      <div className="bg-primary/10 rounded-full p-2">
                        <process.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">{process.title}</h4>
                        <p className="text-xs text-muted-foreground">{process.description}</p>
                      </div>
                      {StatusIcon && (
                        <StatusIcon className={`h-5 w-5 ${getStatusColor(status)}`} />
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant={status === 'pass' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleStatusChange(process.id, 'pass')}
                        className={`flex-1 ${
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
                        onClick={() => handleStatusChange(process.id, 'fail')}
                        className={`flex-1 ${
                          status === 'fail' 
                            ? 'bg-danger hover:bg-danger/90 text-danger-foreground' 
                            : 'border-danger/20 hover:bg-danger/10'
                        }`}
                      >
                        <XCircle className="h-3 w-3 mr-1" />
                        Fail
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Additional Notes */}
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Verification Notes</h3>
              <Textarea
                placeholder="Add any additional observations, concerns, or details about the verification process..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              className="flex-1 bg-gradient-primary"
              disabled={completedProcesses === 0}
            >
              Complete Verification ({completedProcesses}/{verificationProcesses.length})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};