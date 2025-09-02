'use client';
import TransactionTable from '@/components/transaction/TransactionTable';
import { useTransactions } from '@/hooks/transactions';

export default function TransactionsPage() {
  const { data, isLoading, isError, error, isFetching } = useTransactions();

  if (isLoading) return <p className="p-4">Loading transactions...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error?.message}</p>;

  return (
    <div className="p-4">
      <TransactionTable transactions={data ?? []} isFetching={isFetching} />
    </div>
  );
}
