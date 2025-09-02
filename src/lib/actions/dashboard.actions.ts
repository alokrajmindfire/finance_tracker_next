'use server';

import { OverviewService } from '../services/dashboard.service';
import {
  CategoryBreakdownItem,
  DashboardResponse,
  DashboardStats,
  MonthlySummaryItem,
} from '../types/types';
import { requireUserId } from './auth.actions';
import { Types } from 'mongoose';

const service = new OverviewService();

export async function getDashboardOverview(): Promise<
  DashboardResponse<DashboardStats>
> {
  try {
    const userId = await requireUserId();
    const objectId = new Types.ObjectId(userId);
    const overview = await service.getOverview(objectId);
    return { success: true, data: overview };
  } catch (err: any) {
    console.error('getDashboardOverview error:', err);
    return { success: false, error: err.message ?? 'Failed to load overview' };
  }
}

export async function getDashboardCategoryBreakdown(
  month: string,
  year: string
): Promise<DashboardResponse<CategoryBreakdownItem[]>> {
  try {
    const userId = await requireUserId();
    const objectId = new Types.ObjectId(userId);
    const breakdown = await service.getCategoryBreakdown(objectId, month, year);
    return { success: true, data: breakdown };
  } catch (err: any) {
    console.error('getDashboardCategoryBreakdown error:', err);
    return {
      success: false,
      error: err.message ?? 'Failed to load category breakdown',
    };
  }
}

export async function getDashboardMonthlySummary(
  year: string
): Promise<DashboardResponse<MonthlySummaryItem[]>> {
  try {
    const userId = await requireUserId();
    const objectId = new Types.ObjectId(userId);
    const summary = await service.getMonthlySummary(objectId, year);
    return { success: true, data: summary };
  } catch (err: any) {
    console.error('getDashboardMonthlySummary error:', err);
    return {
      success: false,
      error: err.message ?? 'Failed to load monthly summary',
    };
  }
}
