'use client';

import { useForm, Controller } from 'react-hook-form';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
  Dialog,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';
import type { ITransactionType } from '@/lib/types/types';
import { useState, type ReactElement, useEffect } from 'react';
import { getCategories } from '@/lib/actions/category.actions';
import {
  useCreateTransaction,
  useUpdateTransaction,
} from '@/hooks/transactions';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { transactionSchema } from '@/lib/validation/schema-validation';
import { cn } from '@/lib/utils';

interface FormData {
  type: 'income' | 'expense';
  amount: number;
  description: string;
  categoryId: string;
  date: string;
}

interface Props {
  data?: ITransactionType | null;
  children: ReactElement;
}

const TransactionForm = ({ data, children }: Props) => {
  const isEdit = Boolean(data);
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    []
  );

  const createMutation = useCreateTransaction();
  const updateMutation = useUpdateTransaction();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: 'expense',
      amount: 0,
      description: '',
      categoryId: '',
      date: '',
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        type: data.type ?? 'expense',
        amount: data.amount ?? 0,
        description: data.description ?? '',
        categoryId:
          typeof data.categoryId === 'string'
            ? data.categoryId
            : (data?.categoryId ?? ''),
        date: data?.date ? new Date(data.date).toISOString().slice(0, 10) : '',
      });
    } else {
      reset({
        type: 'expense',
        amount: 0,
        description: '',
        categoryId: '',
        date: '',
      });
    }
  }, [data, reset]);

  const handleOpenChange = async (open: boolean) => {
    setIsOpen(open);
    if (open && categories.length === 0) {
      const cats = await getCategories();
      setCategories(cats || []);
    }
  };

  const onSubmit = (formData: FormData) => {
    const transactionData = {
      amount: formData.amount,
      description: formData.description,
      type: formData.type,
      categoryId: formData.categoryId,
      date: formData.date,
    };

    if (isEdit && data) {
      updateMutation.mutate(
        { id: data._id, data: transactionData },
        {
          onSuccess: () => {
            toast.success('Transaction updated successfully');
            reset();
            setIsOpen(false);
          },
          onError: () => {
            toast.error('Failed to update transaction');
          },
        }
      );
    } else {
      createMutation.mutate(transactionData, {
        onSuccess: () => {
          toast.success('Transaction added successfully');
          reset();
          setIsOpen(false);
        },
        onError: () => {
          toast.error('Failed to add transaction');
        },
      });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>
              {isEdit ? 'Edit Transaction' : 'Add New Transaction'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-3">
            <Label htmlFor="type">Type</Label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    className={cn(
                      'w-full border focus-visible:ring-1',
                      errors.type
                        ? 'border-red-500 focus-visible:ring-red-500'
                        : 'border-input'
                    )}
                  >
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Type</SelectLabel>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="amount">Amount</Label>
            <div className="flex items-center">
              <span className="mr-2">$</span>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                className={cn(
                  'border focus-visible:ring-1',
                  errors.amount
                    ? 'border-red-500 focus-visible:ring-red-500'
                    : 'border-input'
                )}
                {...register('amount', {
                  required: 'Amount is required',
                  valueAsNumber: true,
                  min: { value: 0, message: 'Amount must be positive' },
                })}
              />
            </div>
            {errors.amount && (
              <span className="text-red-500">{errors.amount.message}</span>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              {...register('description', {
                required: 'Description is required',
              })}
              className={cn(
                'w-full border focus-visible:ring-1',
                errors.description
                  ? 'border-red-500 focus-visible:ring-red-500'
                  : 'border-input'
              )}
            />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="categoryId">Category</Label>
            <Controller
              name="categoryId"
              control={control}
              rules={{ required: 'Category is required' }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    className={cn(
                      'w-full border focus-visible:ring-1',
                      errors.categoryId
                        ? 'border-red-500 focus-visible:ring-red-500'
                        : 'border-input'
                    )}
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {categories.length > 0 ? (
                        categories.map(cat => (
                          <SelectItem key={cat._id} value={cat._id}>
                            {cat.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="0" disabled>
                          No categories
                        </SelectItem>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.categoryId && (
              <span className="text-red-500">{errors.categoryId.message}</span>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              className={cn(
                'w-full border focus-visible:ring-1',
                errors.date
                  ? 'border-red-500 focus-visible:ring-red-500'
                  : 'border-input'
              )}
              {...register('date', { required: 'Date is required' })}
            />
            {errors.date && (
              <span className="text-red-500">{errors.date.message}</span>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isPending}>
              {isPending
                ? 'Saving...'
                : isEdit
                  ? 'Save Changes'
                  : 'Save Transaction'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default TransactionForm;
