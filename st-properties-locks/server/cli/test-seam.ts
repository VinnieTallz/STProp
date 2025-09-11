import { SeamService } from '../src/services';
import { LockService } from '../src/services';

export async function testSeam(): Promise<void> {
  try {
    console.log('🔍 Initializing services...');
    const seamService = SeamService.getInstance();
    const lockService = LockService.getInstance();

    console.log('✅ Services initialized');

    // Check configuration
    console.log('\n📋 Configuration:');
    const config = seamService.getConfig();
    console.log(`  API Key: ${config.hasApiKey ? '✅ Set' : '❌ Missing'}`);
    console.log(`  Workspace ID: ${config.hasWorkspaceId ? '✅ Set' : '❌ Missing'}`);
    console.log(`  Environment: ${config.environment}`);
    console.log(`  Workspace: ${config.workspaceId}`);

    if (!config.hasApiKey || !config.hasWorkspaceId) {
      console.error('\n❌ Missing required configuration in .env file');
      return;
    }

    // Test API connection
    console.log('\n🌐 Testing API connection...');
    const isConnected = await seamService.checkConnection();
    
    if (isConnected) {
      console.log('✅ Connected to Seam API');
    } else {
      console.log('❌ Failed to connect to Seam API');
      return;
    }

    // Test service health
    console.log('\n🏥 Testing service health...');
    const healthResult = await lockService.checkHealth();
    
    if (healthResult.success) {
      console.log('✅ Lock service is healthy');
      console.log(`  Connected: ${healthResult.data?.connected ? 'Yes' : 'No'}`);
    } else {
      console.log('❌ Lock service health check failed:', healthResult.error);
    }

    // Get device count
    console.log('\n🔐 Checking devices...');
    const locksResult = await lockService.getLocks();
    
    if (locksResult.success && locksResult.data) {
      console.log(`✅ Found ${locksResult.data.length} locks`);
      
      if (locksResult.data.length > 0) {
        const onlineCount = locksResult.data.filter(lock => lock.isOnline).length;
        console.log(`  Online: ${onlineCount}`);
        console.log(`  Offline: ${locksResult.data.length - onlineCount}`);
      }
    } else {
      console.log('❌ Failed to fetch locks:', locksResult.error);
    }

    console.log('\n🎉 Seam test completed!');

  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}