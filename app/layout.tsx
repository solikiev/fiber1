import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fiber Intake Tracker',
  description: 'Track your daily fiber intake with goals and calendar view',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
