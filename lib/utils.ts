import { FiberEntry, TargetGoals, DailyTotal } from './types';

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function parseDate(dateStr: string): Date {
  return new Date(dateStr + 'T00:00:00');
}

export function getTotalForDay(entries: FiberEntry[], date: string): number {
  return entries
    .filter(e => e.date === date)
    .reduce((sum, e) => sum + e.amount, 0);
}

export function getStatusForTotal(total: number, targets: TargetGoals): 'below' | 'on-target' | 'above' | 'no-target' {
  if (targets.min === null || targets.max === null) {
    return 'no-target';
  }
  if (total < targets.min) {
    return 'below';
  }
  if (total > targets.max) {
    return 'above';
  }
  return 'on-target';
}

export function getStatusColor(status: 'below' | 'on-target' | 'above' | 'no-target'): string {
  switch (status) {
    case 'on-target':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'below':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'above':
      return 'bg-red-100 text-red-800 border-red-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
}

export function getDaysInMonth(year: number, month: number): Date[] {
  const days: Date[] = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  // Add days from previous month to fill the first week
  const firstDayOfWeek = firstDay.getDay();
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(year, month, -i);
    days.push(date);
  }
  
  // Add all days of current month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i));
  }
  
  // Add days from next month to fill the last week
  const lastDayOfWeek = lastDay.getDay();
  for (let i = 1; i < 7 - lastDayOfWeek; i++) {
    const date = new Date(year, month + 1, i);
    days.push(date);
  }
  
  return days;
}

export function isToday(date: Date): boolean {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();
}
