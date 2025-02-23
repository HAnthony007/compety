import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";

const authConfig = {
    providers: [
        Github,
        Credentials({
            credentials: {
                email: {},
                password: {},
            },

            authorize: async (credentials) => {
                const email = "admin@gmail.com";
                const password = "admin@123";
                if (
                    credentials.email === email &&
                    credentials.password === password
                ) {
                    return { email, password };
                    // return Promise.resolve({ email });
                } else {
                    throw new Error("Invalid credentials");
                }
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
} satisfies NextAuthConfig;

export default authConfig;
