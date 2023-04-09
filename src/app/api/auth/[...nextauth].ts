import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const { username, password } = credentials as any;
                const res = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                });
                const user = await res.json();

                if (res.ok && user) {
                    return user;
                }
                return null;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
};

export default NextAuth(authOptions);
