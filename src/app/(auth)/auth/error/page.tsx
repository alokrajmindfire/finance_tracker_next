'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
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

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error') || 'Something went wrong';

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <Card className="w-[420px] shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-red-600">
            Authentication Error
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Sign-in failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button asChild className="w-full">
            <Link href="/auth/signin">Back to Sign In</Link>
          </Button>
          <p className="text-sm text-gray-500 text-center">
            Don’t have an account?{' '}
            <Link href="/auth/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
