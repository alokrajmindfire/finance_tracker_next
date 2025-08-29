'use client';

import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (error.message === 'Unauthorized: No session found') {
      signOut();
    }
    console.error('Error caught:', error);
  }, [error]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <Card className="w-[420px] shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-red-600">
            Something went wrong
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error.message || 'An unexpected error occurred.'}
            </AlertDescription>
          </Alert>
        </CardContent>

        <CardFooter className="flex justify-center gap-3">
          <Button variant="default" onClick={() => reset()}>
            Try Again
          </Button>
          <Button variant="outline" onClick={() => signOut()}>
            Sign Out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
