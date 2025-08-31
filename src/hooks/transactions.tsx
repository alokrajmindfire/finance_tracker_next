'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ITransactionType, TransactionInput } from '@/lib/types/types';
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '@/lib/actions/transaction.actions';

export function useTransactions() {
  return useQuery<ITransactionType[], Error>({
    queryKey: ['transactions'],
    queryFn: getTransactions,
    retry: 1,
  });
}

export function useCreateTransaction() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: TransactionInput) => createTransaction(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['transactions'] }),
  });
}

export function useUpdateTransaction() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TransactionInput }) =>
      updateTransaction(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['transactions'] }),
  });
}

export function useDeleteTransaction() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTransaction(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['transactions'] }),
  });
}
