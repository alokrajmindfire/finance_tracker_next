'use server';
import { registerUser } from '@/lib/services/auth.service';

export async function registerUserAction(
  prevState: string | undefined,
  formData: FormData
) {
  return registerUser(prevState, formData);
}
