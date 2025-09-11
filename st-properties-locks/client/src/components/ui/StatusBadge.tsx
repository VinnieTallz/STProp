import React from 'react';
import { Lock, Unlock, Wifi, WifiOff } from 'lucide-react';

interface StatusBadgeProps {
  status: 'locked' | 'unlocked' | 'unknown';
  isOnline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  isOnline = true, 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const getStatusConfig = () => {
    switch (status) {
      case 'locked':
        return {
          icon: Lock,
          text: 'Locked',
          classes: 'bg-green-100 text-green-800 border-green-200'
        };
      case 'unlocked':
        return {
          icon: Unlock,
          text: 'Unlocked',
          classes: 'bg-orange-100 text-orange-800 border-orange-200'
        };
      default:
        return {
          icon: Lock,
          text: 'Unknown',
          classes: 'bg-gray-100 text-gray-800 border-gray-200'
        };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  return (
    <div className="flex items-center gap-2">
      <span className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${statusConfig.classes} ${sizeClasses[size]}`}>
        <StatusIcon className={iconSizes[size]} />
        {statusConfig.text}
      </span>
      
      <span className={`inline-flex items-center gap-1 ${sizeClasses[size]} font-medium rounded-full border ${
        isOnline 
          ? 'bg-green-100 text-green-800 border-green-200' 
          : 'bg-red-100 text-red-800 border-red-200'
      }`}>
        {isOnline ? <Wifi className={iconSizes[size]} /> : <WifiOff className={iconSizes[size]} />}
        {isOnline ? 'Online' : 'Offline'}
      </span>
    </div>
  );
};