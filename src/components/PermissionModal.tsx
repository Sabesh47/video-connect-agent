import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Video, 
  Mic, 
  MapPin, 
  Wifi, 
  CheckCircle, 
  AlertCircle,
  XCircle 
} from "lucide-react";

interface PermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPermissionGranted: () => void;
}

type PermissionStatus = 'checking' | 'good' | 'fair' | 'poor';

interface Permission {
  name: string;
  icon: any;
  status: PermissionStatus;
  quality: number;
  message: string;
}

export const PermissionModal = ({ isOpen, onClose, onPermissionGranted }: PermissionModalProps) => {
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      name: "Video Camera",
      icon: Video,
      status: 'checking',
      quality: 0,
      message: "Checking camera access..."
    },
    {
      name: "Microphone",
      icon: Mic,
      status: 'checking',
      quality: 0,
      message: "Checking microphone access..."
    },
    {
      name: "Location (GPS)",
      icon: MapPin,
      status: 'checking',
      quality: 0,
      message: "Checking location services..."
    },
    {
      name: "Internet Connection",
      icon: Wifi,
      status: 'checking',
      quality: 0,
      message: "Testing connection speed..."
    }
  ]);

  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Simulate permission checking
      const timer = setTimeout(() => {
        setPermissions([
          {
            name: "Video Camera",
            icon: Video,
            status: 'good',
            quality: 95,
            message: "1080p HD ready"
          },
          {
            name: "Microphone",
            icon: Mic,
            status: 'good',
            quality: 88,
            message: "Clear audio detected"
          },
          {
            name: "Location (GPS)",
            icon: MapPin,
            status: 'fair',
            quality: 72,
            message: "Approximate location available"
          },
          {
            name: "Internet Connection",
            icon: Wifi,
            status: 'good',
            quality: 92,
            message: "High speed connection"
          }
        ]);
        setIsComplete(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const getStatusColor = (status: PermissionStatus) => {
    switch (status) {
      case 'good': return 'text-success';
      case 'fair': return 'text-warning';
      case 'poor': return 'text-danger';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: PermissionStatus) => {
    switch (status) {
      case 'good': return CheckCircle;
      case 'fair': return AlertCircle;
      case 'poor': return XCircle;
      default: return AlertCircle;
    }
  };

  const getQualityColor = (quality: number) => {
    if (quality >= 80) return 'bg-success';
    if (quality >= 60) return 'bg-warning';
    return 'bg-danger';
  };

  const allGoodOrFair = permissions.every(p => p.status === 'good' || p.status === 'fair');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Video className="h-5 w-5" />
            <span>System Check</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            We need to verify your system capabilities before you can go online.
          </p>

          <div className="space-y-3">
            {permissions.map((permission) => {
              const StatusIcon = getStatusIcon(permission.status);
              
              return (
                <div key={permission.name} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <permission.icon className="h-4 w-4" />
                      <span className="font-medium text-sm">{permission.name}</span>
                    </div>
                    <StatusIcon className={`h-4 w-4 ${getStatusColor(permission.status)}`} />
                  </div>
                  
                  {permission.status !== 'checking' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Quality</span>
                        <span className="font-medium">{permission.quality}%</span>
                      </div>
                      <Progress 
                        value={permission.quality} 
                        className={`h-2 ${getQualityColor(permission.quality)}`}
                      />
                    </div>
                  )}
                  
                  <p className="text-xs text-muted-foreground mt-2">
                    {permission.message}
                  </p>
                </div>
              );
            })}
          </div>

          {isComplete && (
            <div className="flex space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button 
                onClick={onPermissionGranted}
                disabled={!allGoodOrFair}
                className="flex-1 bg-gradient-primary"
              >
                {allGoodOrFair ? "Go Online" : "Retry Check"}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};