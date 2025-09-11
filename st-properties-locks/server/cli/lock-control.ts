import { LockService } from '../src/services/LockService.js';

export async function lockDevice(lockId: string): Promise<void> {
  try {
    console.log(`🔍 Getting lock status for: ${lockId}`);
    
    const lockService = LockService.getInstance();
    
    // Check if lock exists and get current status
    const statusResult = await lockService.getLockById(lockId);
    
    if (!statusResult.success || !statusResult.data) {
      console.error('❌ Lock not found:', statusResult.error);
      return;
    }

    const lock = statusResult.data;
    console.log(`📋 Lock: ${lock.name}`);
    console.log(`📍 Current status: ${lock.status}`);
    console.log(`🌐 Online: ${lock.isOnline ? 'Yes' : 'No'}`);

    if (!lock.isOnline) {
      console.error('❌ Cannot lock - device is offline');
      return;
    }

    if (lock.status === 'locked') {
      console.log('⚠️ Device is already locked');
      return;
    }

    if (!lock.canRemotelyLock) {
      console.error('❌ Device does not support remote locking');
      return;
    }

    console.log('🔒 Locking device...');
    const result = await lockService.lockDevice(lockId);

    if (result.success) {
      console.log('✅ Device locked successfully!');
      console.log(`📋 Action: ${result.data?.action}`);
      console.log(`📍 New status: ${result.data?.status}`);
    } else {
      console.error('❌ Failed to lock device:', result.error);
    }

  } catch (error) {
    console.error('❌ Lock operation failed:', error);
    process.exit(1);
  }
}

export async function unlockDevice(lockId: string): Promise<void> {
  try {
    console.log(`🔍 Getting lock status for: ${lockId}`);
    
    const lockService = LockService.getInstance();
    
    // Check if lock exists and get current status
    const statusResult = await lockService.getLockById(lockId);
    
    if (!statusResult.success || !statusResult.data) {
      console.error('❌ Lock not found:', statusResult.error);
      return;
    }

    const lock = statusResult.data;
    console.log(`📋 Lock: ${lock.name}`);
    console.log(`📍 Current status: ${lock.status}`);
    console.log(`🌐 Online: ${lock.isOnline ? 'Yes' : 'No'}`);

    if (!lock.isOnline) {
      console.error('❌ Cannot unlock - device is offline');
      return;
    }

    if (lock.status === 'unlocked') {
      console.log('⚠️ Device is already unlocked');
      return;
    }

    if (!lock.canRemotelyUnlock) {
      console.error('❌ Device does not support remote unlocking');
      return;
    }

    console.log('⚠️ WARNING: You are about to UNLOCK a device');
    console.log('🔓 Unlocking device...');
    
    const result = await lockService.unlockDevice(lockId);

    if (result.success) {
      console.log('✅ Device unlocked successfully!');
      console.log(`📋 Action: ${result.data?.action}`);
      console.log(`📍 New status: ${result.data?.status}`);
    } else {
      console.error('❌ Failed to unlock device:', result.error);
    }

  } catch (error) {
    console.error('❌ Unlock operation failed:', error);
    process.exit(1);
  }
}