'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboardOverview } from '@/hooks/dashboard';
import { Wallet, DollarSign, TrendingDown } from 'lucide-react';
import { LoadingCards, ErrorState, EmptyState } from '@/components/ui/states';
import { formatCurrency } from '../ui/format';

type StatCardProps = {
  title: string;
  value: number;
  Icon: React.ComponentType<{ className?: string }>;
  color: string;
};

const StatCard = ({ title, value, Icon, color }: StatCardProps) => (
  <Card
    className="hover:shadow-md transition-shadow"
    aria-label={`${title}: ${formatCurrency(value)}`}
  >
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-gray-600">
        {title}
      </CardTitle>
      <Icon className={`h-4 w-4 ${color}`} aria-hidden="true" />
    </CardHeader>
    <CardContent>
      <div className={`text-2xl font-bold ${color}`}>
        {formatCurrency(value)}
      </div>
    </CardContent>
  </Card>
);

export const StatsCards = () => {
  const { data, isLoading, isFetching, isError, error } =
    useDashboardOverview();

  if (isLoading || isFetching) return <LoadingCards />;
  if (isError)
    return (
      <ErrorState
        message={error instanceof Error ? error.message : 'Unknown error'}
      />
    );

  const stats = data?.data;
  if (!stats) return <EmptyState message="No stats available." />;

  const cards: StatCardProps[] = [
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
      {cards.map(card => (
        <StatCard key={card.title} {...card} />
      ))}
    </div>
  );
};
