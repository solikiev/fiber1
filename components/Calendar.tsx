'use client';

import React, { useState, useEffect } from 'react';
import { FiberEntry, TargetGoals } from '@/lib/types';
import { storage } from '@/lib/storage';
import { 
  getDaysInMonth, 
  formatDate, 
  isToday, 
  isSameDay,
  getTotalForDay,
  getStatusForTotal,
  getStatusColor 
} from '@/lib/utils';

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onDataChange: () => void;
}

export default function Calendar({ selectedDate, onDateSelect, onDataChange }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [entries, setEntries] = useState<FiberEntry[]>([]);
  const [targets, setTargets] = useState<TargetGoals>({ min: null, max: null });

  useEffect(() => {
    loadData();
  }, [onDataChange]);

  const loadData = () => {
    setEntries(storage.getEntries());
    setTargets(storage.getTargets());
  };

  const days = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    onDateSelect(today);
  };

  const getDayTotal = (date: Date): number => {
    const dateStr = formatDate(date);
    return getTotalForDay(entries, dateStr);
  };

  const getDayStatus = (date: Date) => {
    const total = getDayTotal(date);
    return getStatusForTotal(total, targets);
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        >
          ← Prev
        </button>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-gray-900">{monthName}</h2>
          <button
            onClick={goToToday}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Today
          </button>
        </div>
        <button
          onClick={nextMonth}
          className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        >
          Next →
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, idx) => {
          const total = getDayTotal(date);
          const status = getDayStatus(date);
          const isCurrentMonthDay = isCurrentMonth(date);
          const isTodayDate = isToday(date);
          const isSelected = isSameDay(date, selectedDate);
          
          return (
            <button
              key={idx}
              onClick={() => onDateSelect(date)}
              className={`
                relative p-2 min-h-[70px] border rounded-lg transition-all
                ${!isCurrentMonthDay ? 'bg-gray-50 text-gray-400' : 'bg-white'}
                ${isSelected ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-200 hover:border-gray-300'}
                ${isTodayDate && !isSelected ? 'border-blue-300 border-2' : ''}
                ${total > 0 && isCurrentMonthDay ? getStatusColor(status) : ''}
              `}
            >
              <div className="flex flex-col h-full">
                <div className={`text-sm font-medium ${isTodayDate ? 'font-bold' : ''}`}>
                  {date.getDate()}
                </div>
                {total > 0 && isCurrentMonthDay && (
                  <div className="mt-auto">
                    <div className="text-xs font-semibold">
                      {total}g
                    </div>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-600 flex flex-wrap gap-3">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 border-2 border-blue-500 rounded"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 border-2 border-blue-300 rounded"></div>
            <span>Today</span>
          </div>
        </div>
      </div>
    </div>
  );
}
