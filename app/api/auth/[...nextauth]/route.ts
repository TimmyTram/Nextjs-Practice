import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../prisma/prisma";
import bcrypt from "bcryptjs";


export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                // define the fields that are required for the user to provide
                // to authenticate
                // in this case we only need username and password
                username: { label: "Username", type: "text", required: true },
                password: { label: "Password", type: "password", required: true }
            },
            async authorize(credentials) {
                
                // from the credentials object, extract the username and password
                const { username, password } = credentials ?? {};
                
                // if either the username or password is missing, throw an error
                if (!username || !password) {
                    throw new Error("Missing credentials");
                }

                // find the user with the username provided
                const user = await prisma.user.findFirst({ where: { username } });
                if (!user) {
                    throw new Error("User not found");
                }

                // compare the password provided with the hashed password in the database
                const isValidPassword = await bcrypt.compare(password, user.password);
                if (!isValidPassword) {
                    throw new Error("Invalid password");
                }

                // if the user is found and the password is correct, return the user object
                return {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                };
            }
        })
    ],
    callbacks: {
        // callback is called when jwt is created.
        async jwt({ token, user }) {
            if (user) {
                // assign the user role and username to the token
                token.role = user.role;
                token.username = user.username;
            }
            return token;
        },
        // This callback modifies the session object before it is sent to the client
        async session({ session, token }) {
            // if the token has a role and the session has a user object
            if (token?.role && session.user) {
                // assign the role and username to the session user object
                session.user.role = token.role;
                session.user.username = token.username;
            }
            return session;
        }
    },
    pages: { // define the pages that are used for authentication
        signIn: "/auth/signin"
    },
    session: { // state session is managed via jwt
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

// No need to export authOptions
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
