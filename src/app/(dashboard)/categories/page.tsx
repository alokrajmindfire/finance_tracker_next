'use client';

import { useCategories } from '@/hooks/categories';
import { CategoryForm } from '@/components/category/CategoryForm';
import { Card } from '@/components/ui/card';

export default function CategoryPage() {
  const { data, isLoading, isError, error } = useCategories();

  if (isLoading) {
    return <div className="">Loading categories...</div>;
  }

  if (isError) {
    return (
      <div className="text-red-500">Error: {(error as Error).message}</div>
    );
  }

  return (
    <>
      <div className="flex justify-end mb-6 ">
        <CategoryForm />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data && data.length === 0 ? (
          <div className="">No categories found</div>
        ) : (
          data?.map((item: { _id: string; name: string }) => (
            <Card key={item._id} className="pl-5">
              <div className="">
                <div className="text-lg font-semibold">{item.name}</div>
              </div>
            </Card>
          ))
        )}
      </div>
    </>
  );
}
