'use client';

import React, { useState } from 'react';
import { FiberEntry } from '@/lib/types';
import { storage } from '@/lib/storage';

interface AddEntryFormProps {
  date: string;
  onEntryAdded: () => void;
}

export default function AddEntryForm({ date, onEntryAdded }: AddEntryFormProps) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    storage.addEntry({
      date,
      amount: amountNum,
      description: description.trim() || 'Fiber intake',
    });

    setAmount('');
    setDescription('');
    setIsAdding(false);
    onEntryAdded();
  };

  if (!isAdding) {
    return (
      <button
        onClick={() => setIsAdding(true)}
        className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
      >
        + Add Fiber Entry
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-white border border-gray-200 rounded-lg">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
          Amount (grams)
        </label>
        <input
          id="amount"
          type="number"
          step="0.1"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., 5.5"
          required
          autoFocus
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description (optional)
        </label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Apple, Oatmeal"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Add
        </button>
        <button
          type="button"
          onClick={() => {
            setIsAdding(false);
            setAmount('');
            setDescription('');
          }}
          className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
