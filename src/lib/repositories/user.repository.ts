import connectDB from '@/lib/database/db';
import { IUser, User } from '@/lib/modals/user.model';

export interface CreateUserData {
  fullName: string;
  email: string;
  password: string;
}

export class UserRepository {
  async create(userData: CreateUserData): Promise<IUser> {
    await connectDB();
    const user = new User(userData);
    return await user.save();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    await connectDB();
    return User.findOne({ email });
  }

  async exists(email: string): Promise<boolean> {
    await connectDB();
    return !!(await this.findByEmail(email));
  }
}
