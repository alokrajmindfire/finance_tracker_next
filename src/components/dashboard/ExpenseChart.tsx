'use client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useSpendingOverview } from '@/hooks/dashboard';
import ExpenseTrendsChartComponent from './ExpenseTrendsChartComponent';

export default function ExpenseChart() {
  const { data, isLoading, isError } = useSpendingOverview();

  if (isLoading) {
    return (
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Expense Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-6 w-3/4 mb-4" aria-hidden="true" />
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-4 mb-2" aria-hidden="true" />
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
          <p className="text-red-600">Failed to load expense trends.</p>
        </CardContent>
      </Card>
    );
  }

  return <ExpenseTrendsChartComponent data={data.data} />;
}
