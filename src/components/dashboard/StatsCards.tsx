'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingDown, DollarSign, Wallet } from 'lucide-react';
import type { DashboardStats } from '@/lib/types/types';
import { Skeleton } from '@/components/ui/skeleton';

interface StatsCardsProps {
  stats?: DashboardStats; // optional for safety
  isLoading?: boolean;
  error?: string | null;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  stats,
  isLoading,
  error,
}) => {
  if (isLoading) {
    // 🔹 Loading skeletons
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <Skeleton className="h-4 w-24 mb-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    // 🔹 Error state
    return (
      <div className="text-red-600 text-sm">
        Failed to load dashboard stats: {error}
      </div>
    );
  }

  if (!stats) {
    return <p className="text-gray-600">No stats available.</p>;
  }

  const cards = [
    {
      title: 'Total Balance',
      value: stats.currentBalance,
      icon: Wallet,
      color: stats.currentBalance >= 0 ? 'text-green-600' : 'text-red-600',
    },
    {
      title: 'Total Expenses',
      value: stats.totalExpense,
      icon: TrendingDown,
      color: 'text-red-600',
    },
    {
      title: 'Total Income',
      value: stats.totalIncome,
      icon: DollarSign,
      color: 'text-blue-600',
    },
  ];

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map(card => {
        const Icon = card.icon;
        return (
          <Card key={card.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {card.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${card.color}`}>
                {formatCurrency(card.value)}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
