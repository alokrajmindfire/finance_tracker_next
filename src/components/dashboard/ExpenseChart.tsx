'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { getSpendingOverview } from '@/lib/actions/transaction.actions';
import ExpenseTrendsChartComponent from './ExpenseTrendsChartComponent';

export default function ExpenseChart() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['spending-overview'],
    queryFn: getSpendingOverview,
  });

  if (isLoading) {
    return (
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Monthly Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-6 w-3/4 mb-4" />
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-4 mb-2" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (isError || !data?.success) {
    return (
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Expense Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">Failed to load monthly summary.</p>
        </CardContent>
      </Card>
    );
  }

  return <ExpenseTrendsChartComponent data={data.data} />;
}
