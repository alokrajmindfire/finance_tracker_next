'use server';

import { revalidatePath } from 'next/cache';
import { CategoryService } from '@/lib/services/category.service';
import { requireUserId } from './auth.actions';

export async function getCategories() {
  const userId = await requireUserId();
  return CategoryService.getCategories(userId);
}

export async function createCategory(name: string) {
  const userId = await requireUserId();
  // console.log('name', name);
  const category = await CategoryService.addCategory(userId, name);
  revalidatePath('/categories');
  return category;
}
