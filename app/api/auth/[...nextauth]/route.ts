import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", required: true },
                password: { label: "Password", type: "password", required: true }
            },
            async authorize(credentials) {
                const { username, password } = credentials ?? {};
                if (!username || !password) {
                    throw new Error("Missing credentials");
                }

                const user = await prisma.user.findFirst({ where: { username } });
                if (!user) {
                    throw new Error("User not found");
                }

                const isValidPassword = await bcrypt.compare(password, user.password);
                if (!isValidPassword) {
                    throw new Error("Invalid password");
                }

                return {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role as "ADMIN" | "CUSTOMER" | "BUSINESS_OWNER" | "MODERATOR"
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.role && session.user) {
                session.user.role = token.role;
                session.user.username = token.username;
            }
            return session;
        }
    },
    pages: {
        signIn: "/auth/signin"
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };