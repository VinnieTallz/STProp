import { LockService } from '../src/services';

export async function listLocks(): Promise<void> {
  try {
    console.log('🔍 Fetching locks...');
    
    const lockService = LockService.getInstance();
    const result = await lockService.getLocks();

    if (!result.success || !result.data) {
      console.error('❌ Failed to fetch locks:', result.error);
      return;
    }

    const locks = result.data;

    if (locks.length === 0) {
      console.log('📭 No locks found in your workspace');
      return;
    }

    console.log(`✅ Found ${locks.length} locks:\n`);

    locks.forEach((lock, index) => {
      console.log(`${index + 1}. ${lock.name}`);
      console.log(`   ID: ${lock.id}`);
      console.log(`   Status: ${getStatusIcon(lock.status)} ${lock.status.toUpperCase()}`);
      console.log(`   Online: ${lock.isOnline ? '🟢 Yes' : '🔴 No'}`);
      console.log(`   Battery: ${lock.batteryLevel ? `🔋 ${lock.batteryLevel}%` : '❓ Unknown'}`);
      console.log(`   Location: ${lock.location || 'Not set'}`);
      console.log(`   Model: ${lock.manufacturer || 'Unknown'} ${lock.model || ''}`);
      console.log(`   Remote Control: ${lock.canRemotelyLock && lock.canRemotelyUnlock ? '✅' : '❌'}`);
      console.log(''); // Empty line for spacing
    });

    console.log('💡 Tip: Use "npm run cli lock <lock-id>" to control a lock');

  } catch (error) {
    console.error('❌ Failed to list locks:', error);
    process.exit(1);
  }
}

function getStatusIcon(status: string): string {
  switch (status) {
    case 'locked':
      return '🔒';
    case 'unlocked':
      return '🔓';
    case 'unknown':
      return '❓';
    default:
      return '❓';
  }
}