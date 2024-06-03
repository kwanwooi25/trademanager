import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import { prisma } from '../prisma';
import authConfig from './config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/sign-in',
  },

  callbacks: {
    async session({ session, user, token }) {
      if (user !== null) {
        session.user = user;
      }

      return Promise.resolve(session);
    },
    async jwt({ token }) {
      return Promise.resolve(token);
    },
  },

  ...authConfig,
});
