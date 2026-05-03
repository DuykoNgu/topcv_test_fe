import type { ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
  title: string;
  showUserActions?: boolean;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
}

export default function Header({ title, showUserActions = true, leftElement, rightElement }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {leftElement}
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        </div>
        <div className="flex items-center gap-4">
          {rightElement}
          {showUserActions && (
            <>
              <span className="text-sm text-gray-600">Xin chào, {user?.username} ({user?.role})</span>
              <button 
                onClick={logout}
                className="text-sm bg-red-50 text-red-600 px-3 py-1.5 rounded-md hover:bg-red-100 transition-colors"
              >
                Đăng xuất
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
