import { FiberEntry, TargetGoals } from './types';

const ENTRIES_KEY = 'fiber-entries';
const TARGETS_KEY = 'fiber-targets';

export const storage = {
  // Fiber entries
  getEntries(): FiberEntry[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(ENTRIES_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveEntries(entries: FiberEntry[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
  },

  addEntry(entry: Omit<FiberEntry, 'id' | 'timestamp'>): FiberEntry {
    const entries = this.getEntries();
    const newEntry: FiberEntry = {
      ...entry,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
    };
    entries.push(newEntry);
    this.saveEntries(entries);
    return newEntry;
  },

  updateEntry(id: string, updates: Partial<FiberEntry>): void {
    const entries = this.getEntries();
    const index = entries.findIndex(e => e.id === id);
    if (index !== -1) {
      entries[index] = { ...entries[index], ...updates };
      this.saveEntries(entries);
    }
  },

  deleteEntry(id: string): void {
    const entries = this.getEntries();
    const filtered = entries.filter(e => e.id !== id);
    this.saveEntries(filtered);
  },

  getEntriesByDate(date: string): FiberEntry[] {
    return this.getEntries().filter(e => e.date === date);
  },

  // Target goals
  getTargets(): TargetGoals {
    if (typeof window === 'undefined') return { min: null, max: null };
    const data = localStorage.getItem(TARGETS_KEY);
    return data ? JSON.parse(data) : { min: null, max: null };
  },

  saveTargets(targets: TargetGoals): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(TARGETS_KEY, JSON.stringify(targets));
  },
};
