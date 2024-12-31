import { PrismaAdapter } from "@auth/prisma-adapter"
import type { NextAuthConfig } from "next-auth"
import { db } from "@/lib/db"
import Credentials from "next-auth/providers/credentials"
import { logger } from "@/lib/logger"
import { z } from "zod"
import { supabase } from "@/lib/supabase"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    signUp: "/auth/register",
    error: "/auth/error",
    verifyRequest: "/auth/verify",
    newUser: "/auth/new-user",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const { email, password } = loginSchema.parse(credentials)

          // Use Supabase Auth
          const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
          })

          if (authError || !authData.user) {
            logger.warn("Invalid login attempt", { email, error: authError })
            return null
          }

          // Get user data from database
          const { data: userData, error: dbError } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .single()

          if (dbError || !userData) {
            logger.error("Error fetching user data", { email, error: dbError })
            return null
          }

          logger.info("User logged in successfully", { email })
          return {
            id: userData.id,
            email: userData.email,
            name: userData.name,
            image: userData.image,
            role: userData.role,
            permissions: userData.permissions,
          }
        } catch (error) {
          logger.error("Error in authorize function", { error })
          return null
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.role = token.role as string
        session.user.permissions = token.permissions as any
      }

      return session
    },
    async jwt({ token }) {
      if (!token.email) return token

      // Get user data from Supabase
      const { data: userData, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", token.email)
        .single()

      if (error || !userData) {
        return token
      }

      return {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        picture: userData.image,
        role: userData.role,
        permissions: userData.permissions,
      }
    },
  },
} 