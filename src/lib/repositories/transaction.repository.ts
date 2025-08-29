import { Transaction, ITransaction } from '@/lib/modals/transaction.model';
import { Types } from 'mongoose';
import { ITransactionType } from '../types/types';

export class TransactionRepository {
  async findAllByUser(userId: string): Promise<any[]> {
    const docs = await Transaction.find({ userId: new Types.ObjectId(userId) })
      .populate({
        path: 'categoryId',
        select: 'name',
      })
      .sort({ date: -1 })
      .lean();
    console.log('docs', docs);
    return docs.map(doc => ({
      ...doc,
      _id: doc._id.toString(),
      userId: doc.userId.toString(),
      categoryId: doc.categoryId?._id?.toString?.() || doc.categoryId,
      categoryName:
        typeof doc.categoryId === 'object' && 'name' in doc.categoryId
          ? doc.categoryId.name
          : '',
    }));
  }

  async create(data: Partial<ITransaction>) {
    return Transaction.create(data);
  }

  async update(id: string, data: Partial<ITransaction>) {
    return Transaction.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return Transaction.findByIdAndDelete(id);
  }
  async aggregate(pipeline: any[]) {
    return Transaction.aggregate(pipeline);
  }
}
