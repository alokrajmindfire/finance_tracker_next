import BottomNav from '@/components/layout/BottomNav';
import Header from '@/components/layout/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
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
