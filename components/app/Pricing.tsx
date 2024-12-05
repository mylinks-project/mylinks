import PricingCard from "./Pricing-Card";

export default function Pricing() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
          Choose the perfect plan for your link management needs.
        </p>
      </div>
      <div className="grid grid-cols-1 w-72 gap-8 max-w-5xl mx-auto sm:w-96">
        {plans.map((plan) => (
          <PricingCard key={plan.name} plans={plan} />
        ))}
      </div>
    </div>
  );
}

interface PricingCardProps {
  name: string;
  price: number;
  featured: boolean;
  features: string[];
  description?: string;
}

const plans: PricingCardProps[] = [
  {
    name: "Free",
    price: 0,
    featured: false,
    features: [
      "Up to 50 links per month",
      "Basic Analytics",
      "Standard Support",
      "24-hour Statistics",
    ],
    description:
      "Enjoy full access to MyLinks for free while we sustain the service. If we run out of funds, we may introduce paid plans or accept donations to keep the platform running.",
  },
];