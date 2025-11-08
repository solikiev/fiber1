'use client';

import React, { useState } from 'react';
import { FiberEntry } from '@/lib/types';
import { storage } from '@/lib/storage';

interface EntryListProps {
  entries: FiberEntry[];
  onEntriesChanged: () => void;
}

export default function EntryList({ entries, onEntriesChanged }: EntryListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAmount, setEditAmount] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const startEdit = (entry: FiberEntry) => {
    setEditingId(entry.id);
    setEditAmount(entry.amount.toString());
    setEditDescription(entry.description);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditAmount('');
    setEditDescription('');
  };

  const saveEdit = (id: string) => {
    const amountNum = parseFloat(editAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    storage.updateEntry(id, {
      amount: amountNum,
      description: editDescription.trim() || 'Fiber intake',
    });

    cancelEdit();
    onEntriesChanged();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      storage.deleteEntry(id);
      onEntriesChanged();
    }
  };

  if (entries.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No entries for this day yet.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="p-3 bg-white border border-gray-200 rounded-lg"
        >
          {editingId === entry.id ? (
            <div className="space-y-2">
              <input
                type="number"
                step="0.1"
                min="0"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => saveEdit(entry.id)}
                  className="flex-1 px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="flex-1 px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-semibold text-blue-600">
                    {entry.amount}g
                  </span>
                  <span className="text-gray-600">{entry.description}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(entry)}
                  className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
