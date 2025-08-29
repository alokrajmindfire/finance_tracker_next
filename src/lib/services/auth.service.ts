'use server';

import bcrypt from 'bcryptjs';
import { UserRepository } from '@/lib/repositories/user.repository';
import { auth } from '../auth';

const userRepo = new UserRepository();

type RegisterResponse =
  | { success: true; data: { email: string; password: string } }
  | { success: false; error: string };

export async function registerUser(
  _prevState: string | undefined,
  formData: FormData
): Promise<RegisterResponse> {
  try {
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!fullName || !email || !password) {
      return { success: false, error: 'All fields are required.' };
    }

    if (password.length < 6) {
      return {
        success: false,
        error: 'Password must be at least 6 characters long.',
      };
    }

    if (await userRepo.exists(email)) {
      return {
        success: false,
        error: 'User with this email already exists.',
      };
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await userRepo.create({ fullName, email, password: hashedPassword });

    return {
      success: true,
      data: { email, password },
    };
  } catch (error) {
    console.error('err', error);
    let message = 'Something went wrong. Please try again.';

    if (error instanceof Error && error.message) {
      message = error.message;
    }

    return {
      success: false,
      error: message,
    };
  }
}

export async function requireUserIdService(): Promise<string> {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error('Unauthorized: No session found');
  }
  const user = await userRepo.findByEmail(session?.user.email);
  if (!user?._id) {
    throw new Error('Unauthorized: No session found');
  }

  return user._id.toString();
}
