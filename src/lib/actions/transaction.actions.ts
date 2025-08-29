'use server';

import { revalidatePath } from 'next/cache';
import { TransactionService } from '../services/transaction.service';
import { requireUserId } from './auth.actions';
import { Types } from 'mongoose';
import { TransactionInput } from '../types/types';

const service = new TransactionService();
export async function getTransactions() {
  const id = await requireUserId();
  return service.getAll(id);
}

export async function createTransaction(data: TransactionInput) {
  const id = await requireUserId();
  await service.create({ ...data, userId: id });
  revalidatePath('/transactions');
}

export async function updateTransaction(id: string, data: TransactionInput) {
  await requireUserId();
  await service.update(id, data);
  revalidatePath('/transactions');
}

export async function deleteTransaction(id: string) {
  await requireUserId();
  await service.delete(id);
  revalidatePath('/transactions');
}
export async function getSpendingOverview() {
  try {
    const userId = await requireUserId();
    const objectId = new Types.ObjectId(userId);

    const data = await service.getSpendingOverview(objectId);
    return { success: true as const, data };
  } catch (err: any) {
    console.error('getSpendingOverview error:', err);
    return {
      success: false as const,
      error: err?.message ?? 'Failed to load spending overview',
    };
  }
}
