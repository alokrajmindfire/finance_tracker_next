'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Plus, Tag } from 'lucide-react';

const navigationItems = [
  { path: '/', label: 'Dashboard', icon: Home },
  { path: '/transaction', label: 'Transactions', icon: Plus },
  { path: '/categories', label: 'Categories', icon: Tag },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="grid grid-cols-3 gap-1 p-2">
        {navigationItems.map(item => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-md transition-colors ${
                pathname === item.path
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
