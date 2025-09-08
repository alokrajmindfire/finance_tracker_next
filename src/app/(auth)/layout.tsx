import { ModeToggle } from '@/components/layout/Theme';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      {children}
    </div>
  );
}
