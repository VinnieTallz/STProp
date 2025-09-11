import React, { useState } from 'react';
import { Settings, Eye, EyeOff, TestTube, CheckCircle, XCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { ConfigService } from '../services/ConfigService';
import { LockService } from '../services/lock.service';
import { HealthService } from '../services/health.service';

interface ConfigurationProps {
  onConfigured: () => void;
}

export const Configuration: React.FC<ConfigurationProps> = ({ onConfigured }) => {
  const [serverUrl, setServerUrl] = useState('http://localhost:3000');
  const [showServerUrl, setShowServerUrl] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const configService = ConfigService.getInstance();
  const lockService = LockService.getInstance();
  const healthService = HealthService.getInstance();

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);

    try {
      configService.set('SERVER_URL', serverUrl);
      
      // Test server health first
      const healthResult = await healthService.getHealth();
      
      if (healthResult.success) {
        // Then test lock service
        const lockResult = await lockService.getLocks();
        setTestResult({
          success: lockResult.success,
          message: lockResult.success 
            ? `Connection successful! Found ${lockResult.data?.length || 0} locks.` 
            : lockResult.error || 'Connection failed'
        });
      } else {
        setTestResult({
          success: false,
          message: healthResult.error || 'Server health check failed'
        });
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: 'Connection test failed: ' + (error as Error).message
      });
    } finally {
      setTesting(false);
    }
  };

  const handleSave = () => {
    if (!serverUrl) {
      alert('Please provide a server URL.');
      return;
    }

    // CHANGED: Save server configuration instead of Seam credentials
    configService.set('SERVER_URL', serverUrl);
    configService.set('CONFIGURED', 'true');

    onConfigured();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
            <Settings className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Smart Lock Setup</h1>
          <p className="text-gray-600">Configure your server connection to get started</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Server URL *
            </label>
            <div className="relative">
              <input
                type={showServerUrl ? 'text' : 'password'}
                value={serverUrl}
                onChange={(e) => setServerUrl(e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="http://localhost:3000"
              />
              <button
                type="button"
                onClick={() => setShowServerUrl(!showServerUrl)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showServerUrl ? (
                  <EyeOff className="w-4 h-4 text-gray-400" />
                ) : (
                  <Eye className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              The URL of your Smart Lock Manager server
            </p>
          </div>

          {testResult && (
            <div className={`p-3 rounded-lg flex items-center gap-2 ${
              testResult.success 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {testResult.success ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <XCircle className="w-4 h-4" />
              )}
              <span className="text-sm">{testResult.message}</span>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={handleTestConnection}
              loading={testing}
              disabled={!serverUrl}
              className="flex-1"
            >
              <TestTube className="w-4 h-4 mr-2" />
              Test Connection
            </Button>
            
            <Button
              onClick={handleSave}
              disabled={!serverUrl || testing}
              className="flex-1"
            >
              Save & Continue
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Make sure your Smart Lock Manager server is running and accessible
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};