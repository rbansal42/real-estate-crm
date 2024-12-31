"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { VideoBackground } from "@/components/ui/video-background"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isRegisterPage = pathname.includes("register")

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary via-primary/50 to-background" />
        
        <VideoBackground src="/hero-background.mp4" overlayClassName="bg-black/60" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-12 w-48">
              <Image
                src="/assets/logo-light.svg"
                alt="PropDekho Logo"
                fill
                priority
                className="dark:hidden"
              />
              <Image
                src="/assets/logo-dark.svg"
                alt="PropDekho Logo"
                fill
                priority
                className="hidden dark:block"
              />
            </div>
          </Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;PropDekho has revolutionized how we manage our real estate business. The platform is intuitive and powerful.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {isRegisterPage ? "Create an account" : "Welcome back"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isRegisterPage
                ? "Enter your details below to create your account"
                : "Enter your email and password to sign in to your account"}
            </p>
          </div>
          {children}
          <p className="px-8 text-center text-sm text-muted-foreground">
            {isRegisterPage ? (
              <>
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Sign in
                </Link>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <Link
                  href="/auth/register"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Sign up
                </Link>
              </>
            )}
          </p>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By continuing, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
} 