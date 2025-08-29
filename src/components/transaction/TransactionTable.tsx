'use client';

import { ITransactionType } from '@/lib/types/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Plus, Trash2 } from 'lucide-react';
// import { TransactionForm } from './TransactionForm';
import { deleteTransaction } from '@/lib/actions/transaction.actions';
import { useTransition } from 'react';
import dynamic from 'next/dynamic';
const TransactionForm = dynamic(() => import('./TransactionForm'), {
  ssr: false,
  loading: () => <span>Loading form...</span>,
});

interface Props {
  transactions: ITransactionType[];
}

const TransactionTable = ({ transactions }: Props) => {
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <div className="flex justify-end mb-6">
        <TransactionForm>
          <Button
            size="sm"
            variant="outline"
            className="p-0 flex items-center gap-2"
          >
            <Plus className="h-3 w-3" />
            Add Transaction
          </Button>
        </TransactionForm>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map(item => (
            <TableRow key={item._id}>
              <TableCell className="capitalize">{item.type}</TableCell>
              <TableCell>${item.amount}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.categoryName}</TableCell>
              <TableCell className="text-right flex justify-end gap-2">
                <TransactionForm data={item}>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Edit className="h-3 w-3" />
                  </Button>
                </TransactionForm>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    startTransition(() => deleteTransaction(item._id))
                  }
                  disabled={isPending}
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
export default TransactionTable;
