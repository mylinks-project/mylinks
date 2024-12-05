import { BarChart3, Link, QrCode, Shield } from "lucide-react"
import Image from "next/image"

import { Separator } from "@/components/ui/separator"
import PricingPage from "@/components/app/Pricing";

export default function Home() {

  return (
    <div className="mt-10  mx-4 px-4 py-8 rounded-md sm:mx-auto ">
      <div className="flex justify-center flex-col">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center space-y-4 mb-12 max-w-lg">
            <div className="flex items-center justify-center mb-6">
              <Link className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
              Simplify Your Link Management
            </h1>
            <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
              Organize, store, and share all your important links effortlessly with our comprehensive link management platform.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-4 max-w-5xl mx-auto">
            {features.map((feature) => ( <>
              <div key={feature.title} className='relative '>
                <div className='absolute top-0 flex w-full justify-center'>
                  <div className='left-0 h-[1px] animate-border-width rounded-full bg-gradient-to-r from-[rgba(17,17,17,0)] via-white to-[rgba(17,17,17,0)] transition-all duration-1000' />
                </div>
                <div className='flex flex-col h-full items-center justify-center rounded-md border border-gray-800 bg-gradient-to-b dark:from-gray-950 dark:to-black py-6 px-8 dark:text-white text-black '>
                  <div className="flex items-center gap-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="mt-4 text-muted-foreground">{feature.description}</p>
                </div>
              </div>
          </> ))}
          </div>
        </section>
        {/* Dashboard Preview Section */}
        <section className="bg-muted/50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight lg:text-4xl mb-4">
                All-in-One Dashboard
              </h2>
              <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
                Manage, categorize, and analyze all your links from one powerful and easy-to-use dashboard.
              </p>
            </div>
            <div className="relative rounded-lg border bg-background shadow-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=630"
                alt="Dashboard Preview"
                width={1200}
                height={630}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
            </div>
          </div>
        </section>
        <PricingPage />
        <Separator />
      </div>
    </div>
  )
}

const features = [
  {
    title: "Centralized Link Management",
    description: "Store and organize all your links in one place with ease.",
    icon: Link,
  },
  {
    title: "Generate QR Codes",
    description: "Instantly create QR codes for any of your saved links.",
    icon: QrCode,
  },
  {
    title: "Secure Your Links",
    description: "Protect sensitive links with password security.",
    icon: Shield,
  },
  {
    title: "Detailed Analytics",
    description: "Gain insights into your link performance with advanced analytics.",
    icon: BarChart3,
  },
];