import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { CategoryBreakdown } from '@/components/dashboard/CategoryBreakdown';
import { MonthlyChart } from '@/components/dashboard/MonthlyChart';
import ExpenseChart from '@/components/dashboard/ExpenseChart';
import { OverviewFetcher } from '@/components/dashboard/StatsCards';

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<Skeleton className="h-32 w-full" />}>
        <OverviewFetcher />
      </Suspense>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Suspense fallback={<Skeleton className="h-64 w-full" />}>
          <CategoryBreakdown />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-64 w-full" />}>
          <MonthlyChart />
        </Suspense>
      </div>

      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <ExpenseChart />
      </Suspense>
    </div>
  );
}
