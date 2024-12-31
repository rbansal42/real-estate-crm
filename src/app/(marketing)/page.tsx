import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Building2, Users2, LineChart, BarChart3, Building, Users } from "lucide-react"
import { VideoBackground } from "@/components/ui/video-background"

const features = [
  {
    icon: Users2,
    title: "Lead Management",
    description: "Track and manage leads efficiently with our intuitive lead management system.",
  },
  {
    icon: Building2,
    title: "Property Listings",
    description: "Organize and showcase your properties with detailed listings and media.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work seamlessly with your team, assign tasks, and track performance.",
  },
  {
    icon: LineChart,
    title: "Analytics & Reports",
    description: "Make data-driven decisions with comprehensive analytics and reports.",
  },
]

const testimonials = [
  {
    quote: "PropDekho CRM has transformed how we handle our real estate operations. The lead management is exceptional.",
    author: "Rajesh Kumar",
    role: "Senior Sales Manager",
  },
  {
    quote: "The team collaboration features have made it so much easier to work together and close deals faster.",
    author: "Priya Sharma",
    role: "Real Estate Agent",
  },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto">
          <div className="flex h-16 items-center justify-between">
            <Link 
              href="/" 
              className="flex items-center space-x-3 hover:opacity-90 transition-opacity"
            >
              <Building className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">PropDekho CRM</span>
            </Link>
            <nav className="flex items-center space-x-6">
              <Link 
                href="/auth/login"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Sign In
              </Link>
              <Link href="/auth/register">
                <Button size="sm" className="h-9 px-4">
                  Get Started
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative w-full min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
          {/* Gradient Background (shows while video loads) */}
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/20 via-primary/10 to-background" />
          
          <VideoBackground src="/hero-background.mp4" />
          
          {/* Content */}
          <div className="container relative z-10 px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none max-w-3xl mx-auto text-white">
                  Transform Your Real Estate Business with Modern CRM
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                  Streamline your operations, manage leads effectively, and grow your business with PropDekho CRM - 
                  the all-in-one solution for real estate professionals.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/auth/register">
                  <Button size="lg" className="h-11 px-8">
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button variant="outline" size="lg" className="h-11 px-8 bg-white/10 hover:bg-white/20 text-white border-white">
                    Live Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Everything you need to manage your real estate business
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Powerful features designed specifically for real estate professionals
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12 mt-12">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.title} className="relative overflow-hidden rounded-lg border p-8 bg-card hover:bg-accent/10 transition-colors">
                    <div className="flex items-center gap-4">
                      <Icon className="h-8 w-8 text-primary" />
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                    </div>
                    <p className="mt-4 text-muted-foreground">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-24 lg:py-32 bg-primary/5">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Trusted by Real Estate Professionals
              </h2>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12 mt-12">
              {testimonials.map((testimonial) => (
                <div key={testimonial.author} className="relative overflow-hidden rounded-lg bg-background p-8 hover:bg-accent/10 transition-colors">
                  <p className="text-lg font-medium leading-relaxed">"{testimonial.quote}"</p>
                  <div className="mt-6">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Ready to grow your business?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Join thousands of real estate professionals who trust PropDekho CRM
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/auth/register">
                  <Button size="lg">Get Started Now</Button>
                </Link>
                <Link href="#">
                  <Button variant="outline" size="lg">Contact Sales</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container mx-auto flex flex-col gap-4 py-10 px-4 md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building className="h-6 w-6" />
              <span className="font-bold">PropDekho CRM</span>
            </div>
            <nav className="flex gap-4 sm:gap-6">
              <Link className="text-sm hover:underline underline-offset-4" href="#">
                Terms
              </Link>
              <Link className="text-sm hover:underline underline-offset-4" href="#">
                Privacy
              </Link>
              <Link className="text-sm hover:underline underline-offset-4" href="#">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              © 2024 PropDekho CRM. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Made with ❤️ in India
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
