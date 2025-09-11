#!/usr/bin/env tsx
import { config } from 'dotenv';

// Load environment variables
config();

const command = process.argv[2];
const args = process.argv.slice(3);

console.log('🔧 ST Properties Locks CLI');
console.log('============================\n');

switch (command) {
  case 'test-seam':
    console.log('Testing Seam connection...\n');
    const { testSeam } = await import('./test-seam.js');
    await testSeam();
    break;

  case 'list-locks':
    console.log('Listing all locks...\n');
    const { listLocks } = await import('./list-locks.js');
    await listLocks();
    break;

  case 'lock':
    if (!args[0]) {
      console.error('❌ Lock ID required. Usage: npm run cli lock <lock-id>');
      process.exit(1);
    }
    console.log(`Locking device: ${args[0]}\n`);
    const { lockDevice } = await import('./lock-control.js');
    await lockDevice(args[0]);
    break;

  case 'unlock':
    if (!args[0]) {
      console.error('❌ Lock ID required. Usage: npm run cli unlock <lock-id>');
      process.exit(1);
    }
    console.log(`Unlocking device: ${args[0]}\n`);
    const { unlockDevice } = await import('./lock-control.js');
    await unlockDevice(args[0]);
    break;

  case 'help':
  case undefined:
    console.log(`Available commands:
    
  npm run cli test-seam                    Test Seam API connection
  npm run cli list-locks                   List all connected locks
  npm run cli lock <lock-id>              Lock a device
  npm run cli unlock <lock-id>            Unlock a device
  npm run cli help                        Show this help
    
Examples:
  npm run cli test-seam
  npm run cli list-locks
  npm run cli lock abcd-1234-efgh-5678
  npm run cli unlock abcd-1234-efgh-5678
    `);
    break;

  default:
    console.error(`❌ Unknown command: ${command}`);
    console.log('Run "npm run cli help" for available commands');
    process.exit(1);
}