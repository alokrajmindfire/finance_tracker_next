import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { UserRepository } from './repositories/user.repository';

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
        const email: string = credentials.email?.toString() || '';
        const user = await userRepo.findByEmail(email);
        if (!user) return null;

        if (!credentials.password) {
          throw new Error('Credentials not found');
        }
        const isValid = await bcrypt.compare(
          credentials.password.toString(),
          user.password
        );
        if (!isValid) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.fullName,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
});
