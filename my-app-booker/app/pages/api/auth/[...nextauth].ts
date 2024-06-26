import { PrismaAdapter } from "@next-auth/prisma-adapter";
import  NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bycrypt from 'bcrypt';
import prisma from '@brooker-prismadb';

export const authOptions : AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string

        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string

        }), 
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                passwrod: { label: 'password', type: 'password'},

            },
            async authorize(credentials) {
               if (!(credentials?.email) || !(credentials?.passwrod)) throw new Error("Inavlid Credentials");
               const user = await prisma.user.findUnique({
                where: {
                    email: credentials.email
                },
               })
               if (!user || !user.hashedPassword)  throw new Error("No user exits");
               
               const isCorrectPassword = await bycrypt.compare(
                credentials.passwrod,
                user.hashedPassword,
               );
               if (!isCorrectPassword)  throw new Error("Password doesn't match");

               return user;
            }
        })
    ],
    pages: {
        signIn: '/',
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
    events: {
     signIn(message) {
         console.log({ message })
     },
    },
    logger: {
      error(code, meta) {
        console.log(code, meta)
      }
    },
    jwt:{
      secret: process.env.NEXTAUTH_SECRET
    },
    // secret: process.env.NEXTAUTH_SECRET,
}


export default NextAuth(authOptions);