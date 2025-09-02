'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LoadingList, ErrorState } from '../ui/states';
import { useSpendingOverview } from '@/hooks/dashboard';
import { ExpenseTrendsChartComponent } from './ExpenseTrendsChartComponent';

export default function ExpenseChart() {
  const { data, isLoading, isError } = useSpendingOverview();

  if (isLoading) {
    return (
      <Card className="max-w-md" data-testid="expense-chart">
        <CardHeader>
          <CardTitle>Expense Trends</CardTitle>
        </CardHeader>
        <CardContent className="min-h-[200px]">
          <LoadingList rows={5} />
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
        <CardContent className="min-h-[200px]">
          <ErrorState
            message={data?.error ?? 'Failed to load expense trends.'}
          />
        </CardContent>
      </Card>
    );
  }

  return <ExpenseTrendsChartComponent data={data.data} />;
}
