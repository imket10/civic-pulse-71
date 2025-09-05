import { CheckCircle, Clock, AlertCircle, Timer } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "pending" | "assigned" | "in-progress" | "resolved";
  className?: string;
  showIcon?: boolean;
}

const StatusBadge = ({ status, className, showIcon = true }: StatusBadgeProps) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending":
        return {
          label: "Pending",
          icon: Timer,
          className: "status-pending"
        };
      case "assigned":
        return {
          label: "Assigned",
          icon: Clock,
          className: "bg-blue-100 text-blue-800"
        };
      case "in-progress":
        return {
          label: "In Progress",
          icon: AlertCircle,
          className: "status-progress"
        };
      case "resolved":
        return {
          label: "Resolved",
          icon: CheckCircle,
          className: "status-success"
        };
      default:
        return {
          label: "Unknown",
          icon: Clock,
          className: "status-pending"
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <div className={cn("flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium", config.className, className)}>
      {showIcon && <Icon className="w-4 h-4" />}
      <span>{config.label}</span>
    </div>
  );
};

export default StatusBadge;