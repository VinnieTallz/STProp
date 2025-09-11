import React, { useState, useEffect } from 'react';
import { Configuration } from './components/Configuration';
import { Dashboard } from './components/Dashboard';
import { ConfigService } from './services/ConfigService';

function App() {
  const [isConfigured, setIsConfigured] = useState(false);
  const [loading, setLoading] = useState(true);

  const configService = ConfigService.getInstance();

  useEffect(() => {
    // Check if the app is already configured
    const configured = configService.isConfigured();
    setIsConfigured(configured);
    setLoading(false);
  }, []);

  const handleConfigured = () => {
    setIsConfigured(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Initializing Smart Lock Manager...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {!isConfigured ? (
        <Configuration onConfigured={handleConfigured} />
      ) : (
        <Dashboard />
      )}
    </>
  );
}

export default App;