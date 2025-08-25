'use server';

import bcrypt from 'bcryptjs';
import { signIn } from '@/lib/auth';
import { UserRepository } from '@/lib/repositories/user.repository';

const userRepo = new UserRepository();

export async function registerUser(
  prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  try {
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!fullName || !email || !password) return 'All fields are required.';
    if (password.length < 6)
      return 'Password must be at least 6 characters long.';
    if (await userRepo.exists(email))
      return 'User with this email already exists.';

    const hashedPassword = await bcrypt.hash(password, 12);
    await userRepo.create({ fullName, email, password: hashedPassword });

    await signIn('credentials', { email, password, redirect: true });
  } catch (error) {
    console.log('err', error);
  }
}
