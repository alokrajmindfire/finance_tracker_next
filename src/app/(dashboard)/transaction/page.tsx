import { getTransactions } from '@/lib/actions/transaction.actions';
import { ITransactionType } from '@/lib/types/types';
import dynamic from 'next/dynamic';
const TransactionTable = dynamic(
  () => import('@/components/transaction/TransactionTable'),
  { loading: () => <p>Loading...</p> }
);
export default async function TransactionsPage() {
  let transactions: ITransactionType[] = [];

  try {
    transactions = await getTransactions();
  } catch (e: any) {
    return <div className="text-red-500">Failed to load: {e.message}</div>;
  }

  console.log('transactions', transactions);

  return (
    <div className="p-4">
      <TransactionTable transactions={transactions} />
    </div>
  );
}
