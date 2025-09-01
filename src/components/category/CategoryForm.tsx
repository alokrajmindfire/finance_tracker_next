'use client';

import { useForm } from 'react-hook-form';
import { useCreateCategory } from '@/hooks/categories';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema } from '@/lib/validation/schema-validation';
import { cn } from '@/lib/utils';

type CategoryFormValues = {
  name: string;
};

export function CategoryForm() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
  });
  const { mutate, isPending, isError, error } = useCreateCategory();

  const onSubmit = (values: CategoryFormValues) => {
    mutate(values.name, {
      onSuccess: () => {
        reset();
        setIsOpen(false);
        toast.success('Category added successfully');
      },
      onError: e => {
        toast.error(
          `An unexpected error occurred: ${e?.message || 'Unknown error'}`
        );
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="p-0 flex justify-center items-center"
        >
          <Plus className="h-5 w-5 text-blue-600" /> Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              className={cn(
                'border border-input focus-visible:ring-1 w-full',
                errors.name && 'border-red-500 focus-visible:ring-red-500'
              )}
              {...register('name', {
                required: 'Category name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 chars',
                },
              })}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
            {isError && (
              <p className="text-red-500">{(error as Error).message}</p>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              {isPending ? 'Saving...' : 'Save Category'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
