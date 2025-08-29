'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDashboardCategoryBreakdown } from '@/lib/actions/dashboard.actions';
import type { CategoryBreakdownItem } from '@/lib/types/types';

function DateSelector({
  month,
  year,
  setMonth,
  setYear,
}: {
  month: string;
  year: string;
  setMonth: (m: string) => void;
  setYear: (y: string) => void;
}) {
  return (
    <div className="flex items-center space-x-6">
      <div className="flex gap-2">
        <Label>Month:</Label>
        <Select value={month} onValueChange={setMonth}>
          <SelectTrigger className="w-24">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {[...Array(12).keys()].map(m => {
              const val = (m + 1).toString().padStart(2, '0');
              return (
                <SelectItem key={val} value={val}>
                  {val}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Label>Year:</Label>
        <Input
          type="number"
          min={2000}
          max={2100}
          value={year}
          onChange={e => setYear(e.target.value)}
          className="w-24"
        />
      </div>
    </div>
  );
}

export function CategoryBreakdown() {
  const [month, setMonth] = useState(
    (new Date().getMonth() + 1).toString().padStart(2, '0')
  );
  const [year, setYear] = useState(String(new Date().getFullYear()));

  const { data, isLoading, isError } = useQuery({
    queryKey: ['category-breakdown', month, year],
    queryFn: () => getDashboardCategoryBreakdown(month, year),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Category Breakdown for {month}/{year}
        </CardTitle>
        <DateSelector
          month={month}
          year={year}
          setMonth={setMonth}
          setYear={setYear}
        />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <>
            <Skeleton className="h-6 w-3/4 mb-4" />
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-4 mb-2" />
            ))}
          </>
        ) : isError || !data?.success ? (
          <p className="text-red-600">
            {data?.error ?? 'Failed to load breakdown'}
          </p>
        ) : (
          <ul className="space-y-3">
            {data.data && data.data.length === 0 ? (
              <p className="text-gray-600">No expenses found.</p>
            ) : (
              data?.data?.map((item: CategoryBreakdownItem) => (
                <li key={item.categoryId} className="flex justify-between">
                  <span>{item.categoryName}</span>
                  <span className="font-semibold">
                    ${item.total.toFixed(2)}
                  </span>
                </li>
              ))
            )}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
