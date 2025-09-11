import React, { useState } from 'react';
import { X, Plus, Trash2, Clock, Calendar } from 'lucide-react';
import { Lock, Schedule } from '../types';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { LockService } from '../services/lock.service';

interface ScheduleModalProps {
  lock: Lock;
  onClose: () => void;
  onUpdate: () => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({ lock, onClose, onUpdate }) => {
  const [schedules, setSchedules] = useState<Schedule[]>(lock.schedules);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    name: '',
    type: 'unlock' as 'unlock' | 'lock',
    startTime: '09:00',
    endTime: '17:00',
    daysOfWeek: [1, 2, 3, 4, 5] // Weekdays
  });
  const [loading, setLoading] = useState<string | null>(null);

  const lockService = LockService.getInstance();

  const handleAddSchedule = async () => {
    if (!newSchedule.name) {
      alert('Please provide a schedule name.');
      return;
    }

    setLoading('add');
    try {
      const result = await lockService.createSchedule(lock.id, {
        name: newSchedule.name,
        type: newSchedule.type,
        startTime: newSchedule.startTime,
        endTime: newSchedule.endTime,
        daysOfWeek: newSchedule.daysOfWeek,
        isActive: true
      });

      if (result.success && result.data) {
        setSchedules([...schedules, result.data]);
        setNewSchedule({
          name: '',
          type: 'unlock',
          startTime: '09:00',
          endTime: '17:00',
          daysOfWeek: [1, 2, 3, 4, 5]
        });
        setShowAddForm(false);
        onUpdate();
      } else {
        alert(`Failed to add schedule: ${result.error}`);
      }
    } catch (error) {
      alert(`Error: ${(error as Error).message}`);
    } finally {
      setLoading(null);
    }
  };

  const handleRemoveSchedule = async (scheduleId: string) => {
    if (!confirm('Are you sure you want to remove this schedule?')) return;

    setLoading(scheduleId);
    try {
      const result = await lockService.deleteSchedule(lock.id, scheduleId);
      
      if (result.success) {
        setSchedules(schedules.filter(s => s.id !== scheduleId));
        onUpdate();
      } else {
        alert(`Failed to remove schedule: ${result.error}`);
      }
    } catch (error) {
      alert(`Error: ${(error as Error).message}`);
    } finally {
      setLoading(null);
    }
  };

  const formatDaysOfWeek = (days: number[]) => {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    if (days.length === 7) return 'Daily';
    if (days.length === 5 && !days.includes(0) && !days.includes(6)) return 'Weekdays';
    if (days.length === 2 && days.includes(0) && days.includes(6)) return 'Weekends';
    return days.map(day => dayNames[day]).join(', ');
  };

  const handleDayToggle = (day: number) => {
    setNewSchedule(prev => ({
      ...prev,
      daysOfWeek: prev.daysOfWeek.includes(day)
        ? prev.daysOfWeek.filter(d => d !== day)
        : [...prev.daysOfWeek, day].sort()
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Manage Schedules</h2>
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
          {/* Current Schedules */}
          <div className="space-y-4 mb-6">
            {schedules.length === 0 ? (
              <Card className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No schedules configured</p>
                <p className="text-sm text-gray-500">Add a schedule to automate lock operations</p>
              </Card>
            ) : (
              schedules.map((schedule) => (
                <Card key={schedule.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg ${
                          schedule.type === 'unlock' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {schedule.type === 'unlock' ? 
                            <Clock className="w-4 h-4 text-green-600" /> : 
                            <Clock className="w-4 h-4 text-red-600" />
                          }
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{schedule.name}</h4>
                          <p className="text-sm text-gray-600 capitalize">
                            {schedule.type} at {schedule.startTime}
                            {schedule.endTime && ` - ${schedule.endTime}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{formatDaysOfWeek(schedule.daysOfWeek)}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          schedule.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {schedule.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleRemoveSchedule(schedule.id)}
                      loading={loading === schedule.id}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Add Schedule Form */}
          {showAddForm ? (
            <Card className="p-4">
              <h4 className="font-medium text-gray-900 mb-4">Add New Schedule</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Schedule Name
                  </label>
                  <input
                    type="text"
                    value={newSchedule.name}
                    onChange={(e) => setNewSchedule(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Morning Unlock"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Action
                    </label>
                    <select
                      value={newSchedule.type}
                      onChange={(e) => setNewSchedule(prev => ({ ...prev, type: e.target.value as 'unlock' | 'lock' }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="unlock">Unlock</option>
                      <option value="lock">Lock</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      value={newSchedule.startTime}
                      onChange={(e) => setNewSchedule(prev => ({ ...prev, startTime: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Days of Week
                  </label>
                  <div className="flex gap-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleDayToggle(index)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          newSchedule.daysOfWeek.includes(index)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
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
                  onClick={handleAddSchedule}
                  loading={loading === 'add'}
                  disabled={!newSchedule.name || newSchedule.daysOfWeek.length === 0}
                >
                  Add Schedule
                </Button>
              </div>
            </Card>
          ) : (
            <Button
              onClick={() => setShowAddForm(true)}
              className="w-full"
              disabled={loading !== null}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Schedule
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};