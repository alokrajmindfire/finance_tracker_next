'use client';
import { Home, Plus, Tag } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigationItems = [
  { path: '/', label: 'Dashboard', icon: Home },
  { path: '/transaction', label: 'Transactions', icon: Plus },
  { path: '/categories', label: 'Categories', icon: Tag },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="grid grid-cols-3 gap-1 px-1 py-1 sm:p-2">
        {navigationItems.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            href={path}
            className={`flex flex-col items-center justify-center rounded-md transition-colors py-2 sm:py-0 px-0.5 sm:px-1 ${
              pathname === path
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950'
                : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-[10px] sm:text-xs mt-0.5 sm:mt-1">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
