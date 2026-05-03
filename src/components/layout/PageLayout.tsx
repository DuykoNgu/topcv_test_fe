import type { ReactNode } from 'react';
import Header from '../Header';

interface PageLayoutProps {
  headerTitle: string;
  showUserActions?: boolean;
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function PageLayout({
  headerTitle,
  showUserActions = true,
  headerLeft,
  headerRight,
  children,
  className = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-gray-900">
      <Header 
        title={headerTitle} 
        showUserActions={showUserActions}
        leftElement={headerLeft}
        rightElement={headerRight}
      />
      <main className={`flex-1 w-full ${className}`}>
        {children}
      </main>
    </div>
  );
}
