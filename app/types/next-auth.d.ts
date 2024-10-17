import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      role: 'ADMIN' | 'CUSTOMER' | 'BUSINESS_OWNER' | 'MODERATOR';
    } & DefaultSession['CUSTOMER'];
  }

  interface User extends DefaultUser {
    username: string;
    role: 'ADMIN' | 'CUSTOMER' | 'BUSINESS_OWNER' | 'MODERATOR';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    username: string;
    role: 'ADMIN' | 'CUSTOMER' | 'BUSINESS_OWNER' | 'MODERATOR';
  }
}
