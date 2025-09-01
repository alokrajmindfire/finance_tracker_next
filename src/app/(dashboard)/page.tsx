import { MonthlyChart } from '@/components/dashboard/MonthlyChart';
import ExpenseChart from '@/components/dashboard/ExpenseChart';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { CategoryBreakdown } from '@/components/dashboard/CategoryBreakdown';

export default function DashboardOverview() {
  return (
    <div className="space-y-6 mb-16">
      <StatsCards />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CategoryBreakdown />
        <MonthlyChart />
      </div>
      <ExpenseChart />
    </div>
  );
}
