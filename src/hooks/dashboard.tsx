import {
  getDashboardCategoryBreakdown,
  getDashboardMonthlySummary,
  getDashboardOverview,
} from '@/lib/actions/dashboard.actions';
import { getSpendingOverview } from '@/lib/actions/transaction.actions';
import { useQuery } from '@tanstack/react-query';

export function useDashboardOverview() {
  return useQuery({
    queryKey: ['dashboard-overview'],
    queryFn: getDashboardOverview,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
export function useDashboardCategoryBreakdown(month: string, year: string) {
  return useQuery({
    queryKey: ['category-breakdown', month, year],
    queryFn: () => getDashboardCategoryBreakdown(month, year),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    enabled: !!month && !!year,
  });
}
export function useDashboardMonthlySummary(year: string) {
  return useQuery({
    queryKey: ['monthly-summary', year],
    queryFn: () => getDashboardMonthlySummary(year),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}
export function useSpendingOverview() {
  return useQuery({
    queryKey: ['spending-overview'],
    queryFn: getSpendingOverview,
    staleTime: 1000 * 60 * 5,
  });
}
