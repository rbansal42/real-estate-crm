import NextAuth from "next-auth"
import { authOptions } from "@/auth/auth-options"

export const { auth, signIn, signOut } = NextAuth(authOptions) 