import { Suspense } from 'react';
import { getDashboardOverview } from '@/lib/actions/dashboard.actions';
import { Skeleton } from '@/components/ui/skeleton';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { CategoryBreakdown } from '@/components/dashboard/CategoryBreakdown';
import { MonthlyChart } from '@/components/dashboard/MonthlyChart';
import ExpenseChart from '@/components/dashboard/ExpenseChart';

async function OverviewFetcher() {
  const res = await getDashboardOverview();
  if (!res.success) {
    throw new Error(res.error ?? 'Failed to load overview');
  }
  return <StatsCards stats={res.data} />;
}

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<Skeleton className="h-32 w-full" />}>
        <OverviewFetcher />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <ExpenseChart />
      </Suspense>
    </div>
  );
}
