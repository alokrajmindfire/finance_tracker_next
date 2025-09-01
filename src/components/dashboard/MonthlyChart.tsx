'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useMemo, useCallback } from 'react';
import type { MonthlySummaryItem } from '@/lib/types/types';
import { useDashboardMonthlySummary } from '@/hooks/dashboard';
import { DateSelector } from '../ui/DateSelector';
import { LoadingList, ErrorState, EmptyState } from '../ui/states';

const DEFAULT_YEAR = String(new Date().getFullYear());

export const MonthlyChart: React.FC = () => {
  const [year, setYear] = useState(DEFAULT_YEAR);

  const { data, isFetching, isError } = useDashboardMonthlySummary(year);

  const handleSetYear = useCallback((y: string) => setYear(y), []);

  const chartData: MonthlySummaryItem[] = useMemo(() => {
    if (!data?.data) return [];
    return data.data.map(item => ({
      ...item,
      income: Number(item.income.toFixed(2)),
      expenses: Number(item.expenses.toFixed(2)),
    }));
  }, [data?.data]);

  return (
    <Card role="region" aria-labelledby="monthly-summary-title">
      <CardHeader>
        <CardTitle id="monthly-summary-title">Monthly Summary</CardTitle>
        <DateSelector year={year} setYear={handleSetYear} />
      </CardHeader>
      <CardContent className="min-h-[280px]">
        {isFetching ? (
          <LoadingList rows={5} />
        ) : isError || !data?.success ? (
          <ErrorState
            message={data?.error ?? 'Failed to load monthly summary'}
          />
        ) : chartData.length === 0 ? (
          <EmptyState message="No monthly summary found." />
        ) : (
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={value => `$${value.toLocaleString()}`} />
                <Tooltip
                  formatter={(value: number) =>
                    new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(value)
                  }
                />
                <Legend />
                <Bar dataKey="income" fill="#10b981" name="Income" />
                <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
