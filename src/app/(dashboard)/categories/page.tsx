'use client';

import { useCategories } from '@/hooks/categories';
import { CategoryForm } from '@/components/category/CategoryForm';

export default function CategoryPage() {
  const { data, isLoading, isError, error } = useCategories();

  if (isLoading) {
    return <div className="text-gray-500">Loading categories...</div>;
  }

  if (isError) {
    return (
      <div className="text-red-500">Error: {(error as Error).message}</div>
    );
  }

  return (
    <>
      <div className="flex justify-end mb-6">
        <CategoryForm />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data && data.length === 0 ? (
          <div className="text-gray-500">No categories found</div>
        ) : (
          data?.map((item: { _id: string; name: string }) => (
            <div key={item._id} className="bg-white shadow-md rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div className="text-lg font-semibold">{item.name}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
