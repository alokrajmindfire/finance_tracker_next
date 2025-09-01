'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  ResponsiveContainer,
  LineChart,
  BarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { memo, useMemo } from 'react';
import { LoadingList, ErrorState, EmptyState } from '../ui/states';
import type { ExpenseTrendsChart } from '@/lib/types/types';

interface ExpenseTrendsChartProps {
  data?: ExpenseTrendsChart;
  isLoading?: boolean;
  error?: string | null;
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

export const ExpenseTrendsChartComponent = memo(
  ({ data, isLoading, error }: ExpenseTrendsChartProps) => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="h-72 flex items-center justify-center">
              <LoadingList rows={5} />
            </Card>
          ))}
        </div>
      );
    }

    if (error) return <ErrorState message={error} />;

    if (!data) return <EmptyState message="No expense trends available." />;

    const { monthlyExpenses, categoryExpenses, categoryTrends, labels } = data;

    const monthlyData = useMemo(() => {
      return labels.map((label, i) => ({
        month: label,
        expenses: monthlyExpenses.values[i] ?? 0,
      }));
    }, [labels, monthlyExpenses.values]);

    const trendData = useMemo(() => {
      return labels.map((label, idx) => {
        const entry: Record<string, string | number> = { month: label };
        Object.keys(categoryTrends).forEach(cat => {
          entry[cat] = categoryTrends[cat]?.[idx] ?? 0;
        });
        return entry;
      });
    }, [labels, categoryTrends]);

    const pieData = useMemo(() => {
      return categoryExpenses.categories.map((cat, i) => ({
        name: cat,
        value: categoryExpenses.values[i] ?? 0,
      }));
    }, [categoryExpenses]);

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Expenses */}
        <Card className="col-span-1 lg:col-span-2 min-h-[280px]">
          <CardHeader>
            <CardTitle>Monthly Expenses</CardTitle>
          </CardHeader>
          <CardContent className="h-72 flex justify-center items-center">
            {!monthlyData.length ? (
              <EmptyState message="No monthly expenses found." />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="min-h-[280px]">
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-72 flex justify-center items-center">
            {!pieData.length ? (
              <EmptyState message="No category distribution found." />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Category Trends */}
        <Card className="col-span-1 lg:col-span-3 min-h-[320px]">
          <CardHeader>
            <CardTitle>Category Trends Over Time</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex justify-center items-center">
            {!trendData.length ? (
              <EmptyState message="No category trends found." />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {Object.keys(categoryTrends).map((cat, i) => (
                    <Line
                      key={cat}
                      type="monotone"
                      dataKey={cat}
                      stroke={COLORS[i % COLORS.length]}
                      strokeWidth={2}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
);
