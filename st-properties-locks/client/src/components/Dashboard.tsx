import React, { useState, useEffect } from 'react';
import { Shield, RefreshCw, Settings, Activity, AlertTriangle } from 'lucide-react';
import { Lock } from '../types';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { LockCard } from './LockCard';
import { ScheduleModal } from './ScheduleModal';
import { AccessCodesModal } from './AccessCodesModal';
import { LockService } from '../services/lock.service';
import { ConfigService } from '../services/ConfigService';

export const Dashboard: React.FC = () => {
  const [locks, setLocks] = useState<Lock[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedLock, setSelectedLock] = useState<Lock | null>(null);
  const [managingAccessCodesFor, setManagingAccessCodesFor] = useState<Lock | null>(null);
  const [error, setError] = useState<string | null>(null);

  const lockService = LockService.getInstance();
  const configService = ConfigService.getInstance();

  const loadLocks = async () => {
    try {
      setError(null);
      const result = await lockService.getLocks();
      
      if (result.success && result.data) {
        setLocks(result.data);
      } else {
        setError(result.error || 'Failed to load locks');
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadLocks();
  };

  const handleLockUpdate = async (lockId: string) => {
    try {
      console.log(`🔄 Updating lock status for ${lockId}`);
      
      // Add a small delay to allow the lock status to propagate
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get fresh data from server
      const result = await lockService.getLockById(lockId);
      if (result.success && result.data) {
        console.log('✅ Got updated lock data:', result.data);
        setLocks(prevLocks => 
          prevLocks.map(lock => 
            lock.id === lockId ? result.data! : lock
          )
        );
      } else {
        console.error('❌ Failed to get updated lock data:', result.error);
      }
    } catch (error) {
      console.error('Failed to update lock status:', error);
    }
  };

  const handleScheduleManage = (lock: Lock) => {
    setSelectedLock(lock);
  };

  const handleAccessCodesManage = (lock: Lock) => {
    setManagingAccessCodesFor(lock);
  };

  const handleScheduleUpdate = async () => {
    if (selectedLock) {
      await handleLockUpdate(selectedLock.id);
      setSelectedLock(null);
    }
  };

  const handleAccessCodeUpdate = async () => {
    if (managingAccessCodesFor) {
      await handleLockUpdate(managingAccessCodesFor.id);
      
      const result = await lockService.getLockById(managingAccessCodesFor.id);
      if (result.success && result.data) {
        setManagingAccessCodesFor(result.data);
      }
    }
  };

  const handleReconfigure = () => {
    configService.set('SEAM_API_KEY', '');
    configService.set('SEAM_WORKSPACE_ID', '');
    localStorage.removeItem('SERVER_URL');
    window.location.reload();
  };

  useEffect(() => {
    loadLocks();
  }, []);

  const onlineLocks = locks.filter(lock => lock.isOnline);
  const offlineLocks = locks.filter(lock => !lock.isOnline);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading your smart locks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Smart Lock Manager</h1>
              <p className="text-blue-200">Secure access control dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              onClick={handleRefresh}
              loading={refreshing}
              disabled={loading}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            
            <Button
              variant="secondary"
              onClick={handleReconfigure}
              disabled={loading || refreshing}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur border-white/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-white/70 text-sm">Total Locks</p>
                <p className="text-2xl font-bold text-white">{locks.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur border-white/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Activity className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-white/70 text-sm">Online</p>
                <p className="text-2xl font-bold text-white">{onlineLocks.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur border-white/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className="text-white/70 text-sm">Offline</p>
                <p className="text-2xl font-bold text-white">{offlineLocks.length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Locks Grid */}
        {locks.length === 0 ? (
          <Card className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {error ? 'Connection Error' : 'No Locks Found'}
            </h3>
            <p className="text-gray-600 mb-4">
              {error ? 'Please check your configuration and try again.' : 'Connect your first smart lock to get started.'}
            </p>
            <Button onClick={handleRefresh} loading={refreshing}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locks.map((lock) => (
              <LockCard
                key={lock.id}
                lock={lock}
                onLockUpdate={handleLockUpdate}
                onScheduleManage={handleScheduleManage}
                onAccessCodesManage={handleAccessCodesManage}
              />
            ))}
          </div>
        )}

        {/* Schedule Modal */}
        {selectedLock && (
          <ScheduleModal
            lock={selectedLock}
            onClose={() => setSelectedLock(null)}
            onUpdate={handleScheduleUpdate}
          />
        )}

        {/* Access Codes Modal */}
        {managingAccessCodesFor && (
          <AccessCodesModal
            lock={managingAccessCodesFor}
            onClose={() => setManagingAccessCodesFor(null)}
            onUpdate={handleAccessCodeUpdate}
          />
        )}
      </div>
    </div>
  );
};