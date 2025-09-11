import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, KeyRound } from 'lucide-react';
import { Lock, AccessCode } from '../types';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { LockService } from '../services/lock.service';

interface AccessCodesModalProps {
  lock: Lock;
  onClose: () => void;
  onUpdate: () => void;
}

const INITIAL_NEW_CODE_STATE = {
  name: '',
  code: '',
  type: 'ongoing' as 'ongoing' | 'one-time',
};

export const AccessCodesModal: React.FC<AccessCodesModalProps> = ({ lock, onClose, onUpdate }) => {
  const [accessCodes, setAccessCodes] = useState<AccessCode[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAccessCode, setNewAccessCode] = useState(INITIAL_NEW_CODE_STATE);
  const [loading, setLoading] = useState<string | null>(null);
  const [loadingCodes, setLoadingCodes] = useState(true);

  const lockService = LockService.getInstance();

  const loadAccessCodes = async () => {
    setLoadingCodes(true);
    try {
      const result = await lockService.getAccessCodes(lock.id);
      if (result.success && result.data) {
        console.log('📄 Access codes loaded:', result.data);
        setAccessCodes(result.data);
      } else {
        console.error('❌ Failed to load access codes:', result.error);
        setAccessCodes([]);
      }
    } catch (error) {
      console.error('❌ Error loading access codes:', error);
      setAccessCodes([]);
    } finally {
      setLoadingCodes(false);
    }
  };

  // Load access codes when modal opens
  useEffect(() => {
    loadAccessCodes();
  }, [lock.id]);

  const handleAddAccessCode = async () => {
    if (!newAccessCode.name || !newAccessCode.code) {
      alert('Please provide a name and a code.');
      return;
    }
    if (!/^\d{4,8}$/.test(newAccessCode.code)) {
        alert('PIN code must be between 4 and 8 digits.');
        return;
    }

    setLoading('add');
    try {
      const result = await lockService.createAccessCode(lock.id, {
        name: newAccessCode.name,
        code: newAccessCode.code,
        type: newAccessCode.type
      });

      if (result.success && result.data) {
        console.log('✅ Access code created:', result.data);
        setAccessCodes([...accessCodes, result.data]);
        setNewAccessCode(INITIAL_NEW_CODE_STATE);
        setShowAddForm(false);
        onUpdate();
      } else {
        alert(`Failed to add access code: ${result.error}`);
      }
    } catch (error) {
      alert(`Error: ${(error as Error).message}`);
    } finally {
      setLoading(null);
    }
  };

  const handleRemoveAccessCode = async (accessCodeId: string) => {
    if (!confirm('Are you sure you want to remove this access code?')) return;

    setLoading(accessCodeId);
    try {
      const result = await lockService.deleteAccessCode(lock.id, accessCodeId);
      
      if (result.success) {
        console.log('✅ Access code deleted:', accessCodeId);
        setAccessCodes(accessCodes.filter(ac => ac.id !== accessCodeId));
        onUpdate();
      } else {
        alert(`Failed to remove access code: ${result.error}`);
      }
    } catch (error) {
      alert(`Error: ${(error as Error).message}`);
    } finally {
      setLoading(null);
    }
  };

  const generateRandomCode = () => {
    const code = Math.floor(Math.random() * 9000 + 1000).toString();
    setNewAccessCode(prev => ({ ...prev, code }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Manage Access Codes</h2>
            <p className="text-sm text-gray-600">{lock.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Current Access Codes */}
          <div className="space-y-4 mb-6">
            {loadingCodes ? (
              <Card className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Loading access codes...</p>
              </Card>
            ) : accessCodes.length === 0 ? (
              <Card className="text-center py-8">
                <KeyRound className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No access codes configured</p>
                <p className="text-sm text-gray-500">Add codes for guests or service personnel</p>
              </Card>
            ) : (
              accessCodes.map((accessCode) => (
                <Card key={accessCode.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <KeyRound className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{accessCode.name}</h4>
                          <p className="text-sm text-gray-600">Code: {accessCode.code}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="capitalize">{accessCode.type.replace('-', ' ')}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          accessCode.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {accessCode.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <span>
                          Created: {new Date(accessCode.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleRemoveAccessCode(accessCode.id)}
                      loading={loading === accessCode.id}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Add Access Code Form */}
          {showAddForm ? (
            <Card className="p-4">
              <h4 className="font-medium text-gray-900 mb-4">Add New Access Code</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={newAccessCode.name}
                    onChange={(e) => setNewAccessCode(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Guest Code, Cleaning Service"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PIN Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newAccessCode.code}
                        onChange={(e) => setNewAccessCode(prev => ({ ...prev, code: e.target.value.replace(/\D/g, '').slice(0, 8) }))}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="4-8 digits"
                        maxLength={8}
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={generateRandomCode}
                        disabled={loading === 'add'}
                      >
                        Random
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <select
                      value={newAccessCode.type}
                      onChange={(e) => setNewAccessCode(prev => ({ ...prev, type: e.target.value as 'ongoing' | 'one-time' }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="ongoing">Ongoing</option>
                      <option value="one-time">One-time</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  variant="secondary"
                  onClick={() => setShowAddForm(false)}
                  disabled={loading === 'add'}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddAccessCode}
                  loading={loading === 'add'}
                  disabled={!newAccessCode.name || !newAccessCode.code}
                >
                  Add Code
                </Button>
              </div>
            </Card>
          ) : (
            <Button
              onClick={() => setShowAddForm(true)}
              className="w-full"
              disabled={loading !== null || loadingCodes}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Access Code
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

