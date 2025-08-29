'use server';
import {
  registerUser,
  requireUserIdService,
} from '@/lib/services/auth.service';
import { auth } from '../auth';
import { UserRepository } from '../repositories/user.repository';

const userRepo = new UserRepository();

export async function registerUserAction(
  prevState: string | undefined,
  formData: FormData
) {
  return registerUser(prevState, formData);
}

export async function requireUserId(): Promise<string> {
  return await requireUserIdService();
}
