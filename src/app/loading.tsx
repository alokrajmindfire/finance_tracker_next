import Spinner from '@/components/ui/spinner';

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <Spinner />
        <span>Loading...</span>
      </div>
    </div>
  );
}
