import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { UserRepository } from './repositories/user.repository';
import connectDB from './database/db';

const userRepo = new UserRepository();
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GitHub,
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async credentials => {
        try {
          await connectDB();
          const email: string = credentials.email?.toString() || '';
          const user = await userRepo.findByEmail(email);
          if (!user) throw new Error('Invalid email or password');

          if (!credentials.password) {
            throw new Error('Credentials not found');
          }
          const isValid = await bcrypt.compare(
            credentials.password.toString(),
            user.password
          );
          if (!isValid) throw new Error('Invalid email or password');
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.fullName,
          };
        } catch (error) {
          console.error('Authorize error:', error);
          throw new Error('Unauthorized: No session found');
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  trustHost: true,
});
