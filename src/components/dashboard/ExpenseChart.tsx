'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ExpenseTrendsChart } from '@/lib/types/types';
import { useEffect, useState } from 'react';
import { getSpendingOverview } from '@/lib/actions/transaction.actions';
import ExpenseTrendsChartComponent from './ExpenseTrendsChartComponent';

export default function ExpenseChart() {
  const [data, setData] = useState<ExpenseTrendsChart | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSpendingOverview()
      .then(res => {
        if (res.success) setData(res.data);
        else setError(res.error ?? 'Failed to load');
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
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

  if (error || !data) {
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

  return <ExpenseTrendsChartComponent data={data} />;
}
