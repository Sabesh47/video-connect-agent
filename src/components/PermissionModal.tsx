import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
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
      // Start camera preview and check permissions
      const initializeCamera = async () => {
        try {
          const mediaStream = await navigator.mediaDevices.getUserMedia({ 
            video: true, 
            audio: true 
          });
          setStream(mediaStream);
          
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }

          // Simulate other permission checks
          setTimeout(() => {
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
          }, 1000);
        } catch (error) {
          console.error("Camera access denied:", error);
          setPermissions(prev => prev.map(p => 
            p.name === "Video Camera" 
              ? { ...p, status: 'poor', message: "Camera access denied" }
              : p
          ));
        }
      };

      initializeCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
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

          {/* Video Preview */}
          <div className="border rounded-lg p-3 bg-black">
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-center text-xs text-muted-foreground mt-2">
              Camera Preview
            </p>
          </div>

          <div className="space-y-3">
            {permissions.map((permission) => {
              const StatusIcon = getStatusIcon(permission.status);
              
              return (
                <div key={permission.name} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <permission.icon className="h-4 w-4" />
                      <span className="font-medium text-sm">{permission.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {permission.status !== 'checking' && (
                        <span className="text-xs font-medium">{permission.quality}%</span>
                      )}
                      <StatusIcon className={`h-4 w-4 ${getStatusColor(permission.status)}`} />
                    </div>
                  </div>
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