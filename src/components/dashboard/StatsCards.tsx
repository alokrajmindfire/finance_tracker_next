'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useDashboardOverview } from '@/hooks/dashboard';
import { Wallet, DollarSign, TrendingDown } from 'lucide-react';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const StatCard = React.memo(function StatCard({
  title,
  value,
  Icon,
  color,
}: {
  title: string;
  value: number;
  Icon: React.ComponentType<{ className?: string }>;
  color: string;
}) {
  return (
    <Card
      className="hover:shadow-md transition-shadow"
      aria-label={`Stat card for ${title}, value ${currencyFormatter.format(value)}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <Icon className={`h-4 w-4 ${color}`} aria-hidden="true" />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${color}`}>
          {currencyFormatter.format(value)}
        </div>
      </CardContent>
    </Card>
  );
});

const LoadingState = () => (
  <div
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    style={{ minHeight: '140px' }}
  >
    {[0, 1, 2].map(i => (
      <Card
        key={i}
        className="hover:shadow-md transition-shadow"
        aria-busy="true"
      >
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

const ErrorState = ({ message }: { message: string }) => (
  <div className="text-red-600 text-sm">
    Failed to load dashboard stats: {message}
  </div>
);

export const StatsCards = () => {
  const { data, isLoading, isFetching, isError, error } =
    useDashboardOverview();

  if (isLoading || isFetching) return <LoadingState />;
  if (isError)
    return (
      <ErrorState
        message={error instanceof Error ? error.message : 'Unknown error'}
      />
    );

  const stats = data?.data;
  if (!stats) return <p className="text-gray-600">No stats available.</p>;

  const cards = [
    {
      title: 'Total Balance',
      value: stats.currentBalance,
      Icon: Wallet,
      color: stats.currentBalance >= 0 ? 'text-green-600' : 'text-red-600',
    },
    {
      title: 'Total Expenses',
      value: stats.totalExpense,
      Icon: TrendingDown,
      color: 'text-red-600',
    },
    {
      title: 'Total Income',
      value: stats.totalIncome,
      Icon: DollarSign,
      color: 'text-blue-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map(({ title, value, Icon, color }) => (
        <StatCard
          key={title}
          title={title}
          value={value}
          Icon={Icon}
          color={color}
        />
      ))}
    </div>
  );
};
