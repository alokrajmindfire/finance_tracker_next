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
import { Skeleton } from '../ui/skeleton';
import type { ExpenseTrendsChart } from '@/lib/types/types';

interface ExpenseTrendsChartProps {
  data?: ExpenseTrendsChart;
  isLoading?: boolean;
  error?: string | null;
}

interface MonthlyExpense {
  month: string;
  expenses: number;
}

interface TrendEntry {
  month: string;
  [category: string]: string | number;
}

interface PieEntry {
  name: string;
  value: number;
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function ExpenseTrendsChartComponent({
  data,
  isLoading,
  error,
}: ExpenseTrendsChartProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="h-72 flex items-center justify-center">
            <Skeleton className="h-40 w-3/4" />
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-4">
        <p className="text-red-600">Failed to load expense trends: {error}</p>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="p-4">
        <p className="text-gray-600">No expense trends available.</p>
      </Card>
    );
  }

  const { monthlyExpenses, categoryExpenses, categoryTrends, labels } = data;

  const monthlyData: MonthlyExpense[] = labels.map((label, i) => ({
    month: label,
    expenses: monthlyExpenses.values[i] ?? 0,
  }));

  const trendData: TrendEntry[] = labels.map((label, idx) => {
    const entry: TrendEntry = { month: label };
    Object.keys(categoryTrends).forEach(cat => {
      entry[cat] = categoryTrends[cat]?.[idx] ?? 0;
    });
    return entry;
  });

  const pieData: PieEntry[] = categoryExpenses.categories.map((cat, i) => ({
    name: cat,
    value: categoryExpenses.values[i] ?? 0,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Monthly Expenses</CardTitle>
        </CardHeader>
        <CardContent className="h-72 flex justify-center items-center">
          {!monthlyData.length ? (
            <p className="text-gray-600">No monthly expenses found.</p>
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

      <Card>
        <CardHeader>
          <CardTitle>Category Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-72 flex justify-center items-center">
          {!pieData.length ? (
            <p className="text-gray-600">No category distribution found.</p>
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

      <Card className="col-span-1 lg:col-span-3">
        <CardHeader>
          <CardTitle>Category Trends Over Time</CardTitle>
        </CardHeader>
        <CardContent className="h-80 flex justify-center items-center">
          {!trendData.length ? (
            <p className="text-gray-600">No category trends found.</p>
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
