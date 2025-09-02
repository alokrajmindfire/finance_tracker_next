'use client';

import { Home, Plus, Tag } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigationItems = [
  { path: '/', label: 'Dashboard', icon: Home },
  { path: '/transaction', label: 'Transactions', icon: Plus },
  { path: '/categories', label: 'Categories', icon: Tag },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex space-x-6">
      {navigationItems.map(({ path, label, icon: Icon }) => (
        <Link
          key={path}
          href={path}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            pathname === path
              ? 'text-blue-600 bg-blue-50'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}
