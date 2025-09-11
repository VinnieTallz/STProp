import React, { useState } from 'react';
import { Lock as LockIcon, Unlock, Battery, MapPin, Calendar, MoreVertical, Wifi, WifiOff, AlertTriangle, KeyRound } from 'lucide-react';
import { Lock } from '../types';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { StatusBadge } from './ui/StatusBadge';
import { LockService } from '../services/lock.service';
import { formatDistanceToNow } from 'date-fns';

interface LockCardProps {
  lock: Lock;
  onLockUpdate: (lockId: string) => void;
  onScheduleManage: (lock: Lock) => void;
  onAccessCodesManage?: (lock: Lock) => void;
}

export const LockCard: React.FC<LockCardProps> = ({ lock, onLockUpdate, onScheduleManage, onAccessCodesManage }) => {
  const [loading, setLoading] = useState<'lock' | 'unlock' | null>(null);
  const lockService = LockService.getInstance();

  const handleLockAction = async (action: 'lock' | 'unlock') => {
    console.group(`🔒 Lock Action: ${action.toUpperCase()}`);
    console.log('Lock ID:', lock.id);
    console.log('Lock Name:', lock.name);
    console.log('Current Status:', lock.status);
    console.log('Is Online:', lock.isOnline);
    console.log('Can Remotely Lock:', lock.canRemotelyLock);
    console.log('Can Remotely Unlock:', lock.canRemotelyUnlock);
    console.log('Lock Object:', lock);
    
    setLoading(action);
    try {
      console.log(`Calling ${action}Device service method...`);
      
      const result = action === 'lock' 
        ? await lockService.lockDevice(lock.id)
        : await lockService.unlockDevice(lock.id);

      console.log('Service result:', result);

      if (result.success) {
        console.log(`✅ ${action} operation successful`);
        onLockUpdate(lock.id);
      } else {
        console.error(`❌ ${action} operation failed:`, result.error);
        alert(`Failed to ${action} device: ${result.error}`);
      }
    } catch (error) {
      console.error(`💥 Exception during ${action} operation:`, error);
      console.error('Error details:', {
        message: (error as Error).message,
        stack: (error as Error).stack,
        name: (error as Error).name
      });
      alert(`Error: ${(error as Error).message}`);
    } finally {
      setLoading(null);
      console.groupEnd();
    }
  };

  const getBatteryColor = (level?: number) => {
    if (!level) return 'text-gray-400';
    if (level > 50) return 'text-green-600';
    if (level > 20) return 'text-orange-600';
    return 'text-red-600';
  };

  const canPerformAction = (action: 'lock' | 'unlock') => {
    if (!lock.isOnline) return false;
    if (action === 'lock') return lock.canRemotelyLock !== false;
    if (action === 'unlock') return lock.canRemotelyUnlock !== false;
    return true;
  };

  const getActionButtonProps = () => {
    const isLocked = lock.status === 'locked';
    const action = isLocked ? 'unlock' : 'lock';
    const canPerform = canPerformAction(action);
    
    return {
      action,
      canPerform,
      variant: isLocked ? 'warning' : 'success',
      icon: isLocked ? Unlock : LockIcon,
      text: isLocked ? 'Unlock' : 'Lock',
      loading: loading === action
    };
  };

  const actionProps = getActionButtonProps();

  return (
    <Card className="hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            lock.status === 'locked' ? 'bg-green-100' : 'bg-orange-100'
          }`}>
            {lock.status === 'locked' ? 
              <LockIcon className="w-5 h-5 text-green-600" /> : 
              <Unlock className="w-5 h-5 text-orange-600" />
            }
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{lock.name}</h3>
            <p className="text-sm text-gray-500">{lock.manufacturer} {lock.model}</p>
          </div>
        </div>
        
        <button className="p-1 hover:bg-gray-100 rounded">
          <MoreVertical className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="mb-4">
        <StatusBadge status={lock.status} isOnline={lock.isOnline} />
      </div>

      {/* Capability indicators
      {(!lock.canRemotelyLock || !lock.canRemotelyUnlock) && (
        <div className="mb-4 p-2 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-center gap-2 text-amber-800">
            <AlertTriangle className="w-4 h-4" />
            <div className="text-xs">
              <p className="font-medium">Limited Remote Control</p>
              {!lock.canRemotelyLock && <p>• Cannot lock remotely</p>}
              {!lock.canRemotelyUnlock && <p>• Cannot unlock remotely</p>}
            </div>
          </div>
        </div>
      )} */}

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        {lock.batteryLevel && (
          <div className="flex items-center gap-2">
            <Battery className={`w-4 h-4 ${getBatteryColor(lock.batteryLevel)}`} />
            <span className="text-gray-600">{lock.batteryLevel}%</span>
          </div>
        )}
        
        {lock.location && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600 truncate">{lock.location}</span>
          </div>
        )}
        
        <div className="flex items-center gap-4 col-span-2 text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>
              {(lock.schedules?.length || 0)} schedule{(lock.schedules?.length || 0) !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-gray-400" />
            <span>
              {(lock.accessCodes?.length || 0)} code{(lock.accessCodes?.length || 0) !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {lock.lastActivity && (
        <div className="mb-4 p-2 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500">
            Last activity: {formatDistanceToNow(lock.lastActivity, { addSuffix: true })}
          </p>
        </div>
      )}

      <div className="flex gap-2">
        <Button
          variant={actionProps.variant}
          size="sm"
          onClick={() => handleLockAction(actionProps.action)}
          loading={actionProps.loading}
          disabled={!actionProps.canPerform || loading !== null}
          className="flex-1"
          title={!actionProps.canPerform ? `Device does not support remote ${actionProps.action}ing` : ''}
        >
          <actionProps.icon className="w-4 h-4 mr-1" />
          {actionProps.text}
        </Button>
        
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onScheduleManage(lock)}
          className="flex-1"
          disabled={!lock.supportsAccessCodes}
          title={!lock.supportsAccessCodes ? 'Device does not support access code scheduling' : ''}
        >
          <Calendar className="w-4 h-4 mr-1" />
          Schedules
        </Button>

        {onAccessCodesManage && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onAccessCodesManage(lock)}
            className="flex-1"
          >
            <KeyRound className="w-4 h-4 mr-1" />
            Codes
          </Button>
        )}
      </div>
    </Card>
  );
};