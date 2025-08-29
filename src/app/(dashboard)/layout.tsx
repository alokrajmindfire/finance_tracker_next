'use client';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';

const Spinner = dynamic(() => import('@/components/ui/spinner'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});
const Header = dynamic(() => import('@/components/layout/Header'), {
  ssr: false,
  loading: () => <Spinner />,
});
const BottomNav = dynamic(() => import('@/components/layout/BottomNav'), {
  ssr: false,
  loading: () => <Spinner />,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const { status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <Spinner />
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
