'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function LoadingList({ rows = 4 }: { rows?: number }) {
  return (
    <div aria-busy="true">
      <Skeleton className="h-6 w-3/4 mb-4" />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-4 mb-2" />
      ))}
    </div>
  );
}

export function LoadingCards({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[140px]">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="p-4 border rounded-lg shadow-sm"
          aria-busy="true"
        >
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-8 w-32" />
        </div>
      ))}
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <p role="alert" className="text-red-600 text-sm">
      {message}
    </p>
  );
}

export function EmptyState({
  message = 'No data available.',
}: {
  message?: string;
}) {
  return <p className="text-gray-600">{message}</p>;
}
