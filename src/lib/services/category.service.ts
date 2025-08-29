import { ApiError } from 'next/dist/server/api-utils';
import { CategoryRepository } from '../repositories/category.repository';

export interface CategoryDTO {
  _id: string;
  name: string;
  userId: string;
}

export class CategoryService {
  static async getCategories(userId: string): Promise<CategoryDTO[]> {
    return await CategoryRepository.findByUserId(userId);
  }

  static async addCategory(userId: string, name: string): Promise<CategoryDTO> {
    if (!name || name.trim() === '') {
      throw new ApiError(400, 'Category name is required');
    }

    const category = await CategoryRepository.createCategory({ name, userId });
    if (!category._id) {
      throw new Error('failled to add category');
    }
    return {
      _id: category._id.toString(),
      name: category.name,
      userId: category.userId.toString(),
    };
  }
}
