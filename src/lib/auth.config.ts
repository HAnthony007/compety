import { loginFormSchemas } from "@/components/Auth/Login/loginSchema";
import { db } from "@/db";
import { users } from "@/db/schema";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { NextAuthConfig } from "next-auth";
import { encode } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import { v4 as uuid } from "uuid";

const adapter = DrizzleAdapter(db);

const authConfig = {
    adapter,
    providers: [
        Github,
        Credentials({
            credentials: {
                email: {},
                password: {},
            },

            authorize: async (credentials) => {
                const validatedCredentials =
                    loginFormSchemas.parse(credentials);

                const userFound = await db
                    .select()
                    .from(users)
                    .where(eq(users.email, validatedCredentials.email))
                    .limit(1)
                    .execute();

                const user = userFound[0];

                if (!user) {
                    console.log("Email doesn't exist");
                    throw new Error("Email doesn't exist");
                }

                const passwordMatch =
                    user.password &&
                    (await bcrypt.compare(
                        validatedCredentials.password,
                        user.password
                    ));

                if (!passwordMatch) {
                    console.log("Password doesn't match");
                    throw new Error("Password doesn't match");
                }

                console.log("User found", user);
                return user;
            },
        }),
    ],

    callbacks: {
        async jwt({ token, account }) {
            if (account?.provider === "credentials") {
                token.credentials = true;
            }
            return token;
        },
    },

    jwt: {
        encode: async function (params) {
            if (params.token?.credentials) {
                const sessionToken = uuid();

                if (!params.token.sub) {
                    throw new Error("No user id found in token");
                }

                const createdSession = await adapter?.createSession?.({
                    sessionToken: sessionToken,
                    userId: params.token.sub,
                    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                });

                if (!createdSession) {
                    throw new Error("Could not create session");
                }

                return sessionToken;
            }
            return encode(params);
        },
    },
} satisfies NextAuthConfig;

export default authConfig;
