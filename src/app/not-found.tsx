'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/ui/spinner';

export default function NotFound() {
  const { data: session, status } = useSession();
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
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="max-w-md w-full text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-6xl">404</CardTitle>
          <CardDescription>Oops! Page not found.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-gray-600">
            The resource you are looking for might have been removed, had its
            name changed, or is temporarily unavailable.
          </p>
          <Link href={session ? '/' : '/login'}>
            <Button variant="default">
              {session ? 'Go to Home' : 'Go to Login'}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
