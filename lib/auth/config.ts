import { getUserByEmail } from '@/actions/user';
import { hashPassword } from '@/app/api/user/utils';
import { User } from '@prisma/client';
import axios from 'axios';
import { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        // TODO
        console.log('credentials', credentials);
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

export default authConfig;
