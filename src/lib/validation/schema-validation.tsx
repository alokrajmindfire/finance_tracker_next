import { z } from 'zod';

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .nonempty({ message: 'Category name is required' }),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;

export const transactionSchema = z.object({
  type: z
    .enum(['income', 'expense'])
    .refine(val => val === 'income' || val === 'expense', {
      message: 'Type is required',
    }),
  amount: z
    .number()
    .refine(val => !isNaN(val), { message: 'Amount must be a number' })
    .min(0.01, { message: 'Amount must be positive' }),
  description: z.string().min(1, { message: 'Description is required' }),
  categoryId: z.string().min(1, { message: 'Category is required' }),
  date: z.string().min(1, { message: 'Date is required' }),
});

export type TransactionFormValues = z.infer<typeof transactionSchema>;
