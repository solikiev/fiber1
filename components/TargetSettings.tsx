'use client';

import React, { useState, useEffect } from 'react';
import { TargetGoals } from '@/lib/types';
import { storage } from '@/lib/storage';

interface TargetSettingsProps {
  onTargetsChanged: () => void;
}

export default function TargetSettings({ onTargetsChanged }: TargetSettingsProps) {
  const [targets, setTargets] = useState<TargetGoals>({ min: null, max: null });
  const [isEditing, setIsEditing] = useState(false);
  const [minInput, setMinInput] = useState('');
  const [maxInput, setMaxInput] = useState('');

  useEffect(() => {
    const savedTargets = storage.getTargets();
    setTargets(savedTargets);
  }, []);

  const startEdit = () => {
    setIsEditing(true);
    setMinInput(targets.min?.toString() || '');
    setMaxInput(targets.max?.toString() || '');
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setMinInput('');
    setMaxInput('');
  };

  const saveTargets = () => {
    const min = minInput ? parseFloat(minInput) : null;
    const max = maxInput ? parseFloat(maxInput) : null;

    if (min !== null && (isNaN(min) || min < 0)) {
      alert('Please enter a valid minimum value');
      return;
    }

    if (max !== null && (isNaN(max) || max < 0)) {
      alert('Please enter a valid maximum value');
      return;
    }

    if (min !== null && max !== null && min > max) {
      alert('Minimum cannot be greater than maximum');
      return;
    }

    const newTargets = { min, max };
    storage.saveTargets(newTargets);
    setTargets(newTargets);
    setIsEditing(false);
    onTargetsChanged();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Daily Target Goals</h3>
      
      {isEditing ? (
        <div className="space-y-3">
          <div>
            <label htmlFor="min-target" className="block text-sm font-medium text-gray-700 mb-1">
              Minimum (grams)
            </label>
            <input
              id="min-target"
              type="number"
              step="0.1"
              min="0"
              value={minInput}
              onChange={(e) => setMinInput(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 20"
            />
          </div>
          <div>
            <label htmlFor="max-target" className="block text-sm font-medium text-gray-700 mb-1">
              Maximum (grams)
            </label>
            <input
              id="max-target"
              type="number"
              step="0.1"
              min="0"
              value={maxInput}
              onChange={(e) => setMaxInput(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 25"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={saveTargets}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Save
            </button>
            <button
              onClick={cancelEdit}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          {targets.min === null && targets.max === null ? (
            <div className="text-gray-500 mb-3">
              No targets set. Click below to set your daily fiber goals.
            </div>
          ) : (
            <div className="mb-3">
              <div className="text-2xl font-bold text-gray-900">
                {targets.min ?? '?'}g - {targets.max ?? '?'}g
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Target Range
              </div>
            </div>
          )}
          <button
            onClick={startEdit}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            {targets.min === null && targets.max === null ? 'Set Targets' : 'Edit Targets'}
          </button>
        </div>
      )}
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600 space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-200 border border-green-400 rounded"></div>
            <span>Green = Within target range</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-200 border border-yellow-400 rounded"></div>
            <span>Yellow = Below minimum</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-200 border border-red-400 rounded"></div>
            <span>Red = Above maximum</span>
          </div>
        </div>
      </div>
    </div>
  );
}
