'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useCallback, useMemo, lazy } from 'react';
import type { CategoryBreakdownItem } from '@/lib/types/types';
import { useDashboardCategoryBreakdown } from '@/hooks/dashboard';
import { DateSelector } from '../ui/DateSelector';
import { LoadingList, EmptyState } from '../ui/states';
const ErrorState = lazy(() =>
  import('../ui/states').then(m => ({ default: m.ErrorState }))
);

const DEFAULT_MONTH = (new Date().getMonth() + 1).toString().padStart(2, '0');
const DEFAULT_YEAR = String(new Date().getFullYear());

export function CategoryBreakdown() {
  const [month, setMonth] = useState(DEFAULT_MONTH);
  const [year, setYear] = useState(DEFAULT_YEAR);

  const { data, isFetching, isError } = useDashboardCategoryBreakdown(
    month,
    year
  );

  const handleSetMonth = useCallback((m: string) => setMonth(m), []);
  const handleSetYear = useCallback((y: string) => setYear(y), []);

  const items: CategoryBreakdownItem[] = useMemo(
    () => data?.data ?? [],
    [data?.data]
  );

  const content = useMemo(() => {
    if (isFetching) return <LoadingList rows={1} />;
    if (isError || !data?.success)
      return <ErrorState message={data?.error ?? 'Failed to load breakdown'} />;
    if (items.length === 0) return <EmptyState message="No expenses found." />;
    return (
      <ul className="space-y-3" aria-label="Category breakdown list">
        {items.map(item => (
          <li
            key={item.categoryId}
            className="flex justify-between items-center"
          >
            <span>{item.categoryName}</span>
            <span className="font-mono font-semibold w-16 text-right">
              ${item.total.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    );
  }, [isFetching, isError, data?.success, items]);

  return (
    <Card
      role="region"
      aria-labelledby="category-breakdown-title"
      data-testid="category-breakdown"
    >
      <CardHeader>
        <CardTitle id="category-breakdown-title">
          Category Breakdown for {month}/{year}
        </CardTitle>
        <DateSelector
          month={month}
          year={year}
          setMonth={handleSetMonth}
          setYear={handleSetYear}
        />
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
}
