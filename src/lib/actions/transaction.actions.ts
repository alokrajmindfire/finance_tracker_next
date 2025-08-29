'use server';

import { revalidatePath } from 'next/cache';
import { TransactionService } from '../services/transaction.service';
import { requireUserId } from './auth.actions';
import { Types } from 'mongoose';

const service = new TransactionService();

export async function getTransactions() {
  const id = await requireUserId();
  return service.getAll(id);
}

export async function createTransaction(data: any) {
  const id = await requireUserId();
  await service.create({ ...data, userId: id });
  revalidatePath('/transactions');
}

export async function updateTransaction(id: string, data: any) {
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

    const data = await service.getSpendingOverview(objectId); // implement in service (see below)
    return { success: true as const, data };
  } catch (err: any) {
    console.error('getSpendingOverview error:', err);
    return {
      success: false as const,
      error: err?.message ?? 'Failed to load spending overview',
    };
  }
}
