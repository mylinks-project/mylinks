import { BarChart3, Link, Shield, QrCode } from "lucide-react";

export default function Features() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4">
          Powerful Features
        </h1>
        <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
          Everything you need to manage and optimize your links effectively.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {features.map((feature) => (
           <div key={feature.title} className='relative '>
           <div className='absolute top-0 flex w-full justify-center'>
             <div className='left-0 h-[1px] animate-border-width rounded-full bg-gradient-to-r from-[rgba(17,17,17,0)] via-white to-[rgba(17,17,17,0)] transition-all duration-4000' />
           </div>
           <div className='flex flex-col h-full items-center justify-center rounded-md border border-gray-800 bg-gradient-to-b dark:from-gray-950 dark:to-black py-6 px-8 dark:text-white text-black '>
             <div className="flex items-center gap-4">
               <feature.icon className="h-8 w-8 text-primary" />
               <h3 className="text-xl font-semibold">{feature.title}</h3>
             </div>
             <p className="mt-4 text-muted-foreground">{feature.description}</p>
           </div>
         </div>
        ))}
      </div>
    </div>
  );
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