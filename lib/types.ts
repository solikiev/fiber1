export interface FiberEntry {
  id: string;
  date: string; // YYYY-MM-DD format
  amount: number;
  description: string;
  timestamp: number;
}

export interface TargetGoals {
  min: number | null;
  max: number | null;
}

export interface DailyTotal {
  date: string;
  total: number;
  status: 'below' | 'on-target' | 'above' | 'no-target';
}
