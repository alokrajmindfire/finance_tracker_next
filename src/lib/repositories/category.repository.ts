import { Category } from '../modals/category.model';
import { CategoryDTO } from '../services/category.service';

export class CategoryRepository {
  static async findByUserId(userId: string) {
    const categories = await Category.find({ userId }).lean().exec();

    return categories.map((c: any) => ({
      ...c,
      _id: c._id.toString(),
      userId: c.userId.toString(),
      createdAt: c.createdAt?.toISOString(),
      updatedAt: c.updatedAt?.toISOString(),
    }));
  }

  static async createCategory(data: { name: string; userId: string }) {
    return Category.create(data);
  }
}
