'use client';

import React, { useState, useEffect } from 'react';
import Calendar from '@/components/Calendar';
import AddEntryForm from '@/components/AddEntryForm';
import EntryList from '@/components/EntryList';
import TargetSettings from '@/components/TargetSettings';
import { FiberEntry, TargetGoals } from '@/lib/types';
import { storage } from '@/lib/storage';
import { formatDate, getTotalForDay, getStatusForTotal, getStatusColor } from '@/lib/utils';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [entries, setEntries] = useState<FiberEntry[]>([]);
  const [targets, setTargets] = useState<TargetGoals>({ min: null, max: null });
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    loadData();
  }, [refreshKey]);

  const loadData = () => {
    setEntries(storage.getEntries());
    setTargets(storage.getTargets());
  };

  const handleDataChange = () => {
    setRefreshKey(prev => prev + 1);
  };

  const selectedDateStr = formatDate(selectedDate);
  const selectedDateEntries = entries.filter(e => e.date === selectedDateStr);
  const dailyTotal = getTotalForDay(entries, selectedDateStr);
  const status = getStatusForTotal(dailyTotal, targets);
  const statusColorClass = getStatusColor(status);

  const formattedSelectedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Fiber Intake Tracker
          </h1>
          <p className="text-gray-600">
            Track your daily fiber intake and reach your health goals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Target Settings */}
          <div className="lg:col-span-1">
            <TargetSettings onTargetsChanged={handleDataChange} />
          </div>

          {/* Middle Column - Calendar */}
          <div className="lg:col-span-2">
            <Calendar
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              onDataChange={handleDataChange}
            />
          </div>
        </div>

        {/* Daily View Section */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Daily Summary */}
          <div className="lg:col-span-1">
            <div className={`p-6 rounded-lg border-2 ${statusColorClass}`}>
              <h2 className="text-lg font-semibold mb-2">Daily Total</h2>
              <div className="text-4xl font-bold mb-2">
                {dailyTotal}g
              </div>
              <div className="text-sm">
                {formattedSelectedDate}
              </div>
              {targets.min !== null && targets.max !== null && (
                <div className="mt-4 pt-4 border-t border-current opacity-70">
                  <div className="text-sm">
                    Target: {targets.min}g - {targets.max}g
                  </div>
                  <div className="text-sm font-semibold mt-1">
                    {status === 'on-target' && '✓ On Target'}
                    {status === 'below' && '↓ Below Target'}
                    {status === 'above' && '↑ Above Target'}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Entries for Selected Day */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Entries for {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </h2>
              <AddEntryForm date={selectedDateStr} onEntryAdded={handleDataChange} />
            </div>

            <div>
              <EntryList entries={selectedDateEntries} onEntriesChanged={handleDataChange} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>All data is stored locally in your browser</p>
        </div>
      </div>
    </main>
  );
}
