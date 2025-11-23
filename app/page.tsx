import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CloudRain, Flower2, Shield, TrendingUp, type LucideIcon } from 'lucide-react';

type FeatureCardProps = {
  Icon: LucideIcon;
  title: string;
  text: string;
};

const features: FeatureCardProps[] = [
  {
    Icon: CloudRain,
    title: 'Track Climate & Floral Conditions',
    text: 'Monitor environmental factors that directly impact your honey production',
  },
  {
    Icon: TrendingUp,
    title: 'Standardized 1-3 Scoring',
    text: 'Simple rating system for each risk factor makes tracking consistent and easy',
  },
  {
    Icon: Shield,
    title: 'Automatic Risk Scoring',
    text: 'Get instant overall risk scores and actionable suggestions for your apiary',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen text-amber-900">
      <div className="relative flex min-h-screen flex-col">
        <header className="container mx-auto flex items-center justify-between px-6 py-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="animate-bounce">
                <ellipse cx="18" cy="20" rx="10" ry="12" fill="#FFB300" />
                <ellipse cx="18" cy="18" rx="8" ry="10" fill="#D8A800" />
                <circle cx="15" cy="16" r="2" fill="#000" />
                <circle cx="21" cy="16" r="2" fill="#000" />
                <path d="M18 10 L16 6 L14 10" stroke="#000" strokeWidth="2" strokeLinecap="round" />
                <path d="M18 10 L20 6 L22 10" stroke="#000" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-2xl font-bold">HiveYield</span>
          </div>

          <Button asChild variant="secondary">
            <Link href="/sign-in">Log in</Link>
          </Button>
        </header>

        <main className="container mx-auto flex-1 px-6 py-16">
          <div className="mx-auto mb-20 max-w-4xl text-center">
            <div className="relative mb-8">
              <svg className="absolute right-1/4 top-0 animate-pulse" width="40" height="40" viewBox="0 0 40 40">
                <ellipse cx="20" cy="22" rx="12" ry="14" fill="#FFB300" />
                <ellipse cx="20" cy="20" rx="10" ry="12" fill="#D8A800" />
                <circle cx="16" cy="18" r="2.5" fill="#000" />
                <circle cx="24" cy="18" r="2.5" fill="#000" />
                <path d="M20 12 L18 7 L16 12" stroke="#000" strokeWidth="2" strokeLinecap="round" />
                <path d="M20 12 L22 7 L24 12" stroke="#000" strokeWidth="2" strokeLinecap="round" />
              </svg>

              <div className="relative inline-block">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                  <div className="animate-drip">
                    <svg width="8" height="64" viewBox="0 0 8 64" className="mx-auto">
                      <path
                        d="M4 0 Q4 10 4 20 Q4 25 6 28 Q8 30 6 35 Q4 40 4 50 Q4 55 6 58 Q8 60 4 64 Q0 60 2 58 Q4 55 4 50 Q4 40 2 35 Q0 30 2 28 Q4 25 4 20 Q4 10 4 0"
                        fill="#FFB300"
                        opacity="0.7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <h1 className="pt-12 text-5xl font-bold md:text-6xl">Anticipate Your Honey Yield</h1>
            </div>

            <p className="mb-8 mx-auto max-w-2xl text-xl text-amber-800">
              Track climate, disease, and floral conditions to make informed decisions about your apiary&apos;s honey production.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild>
                <Link href="/sign-in">Get Started</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/sign-in">Log in</Link>
              </Button>
            </div>
          </div>

          <div className="mx-auto mb-20 grid max-w-5xl gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>

          <div className="text-center text-amber-700">
            <div className="inline-flex items-center gap-2">
              <Flower2 className="h-5 w-5" />
              <span className="text-sm">Making beekeeping decisions sweeter, one report at a time</span>
              <Flower2 className="h-5 w-5" />
            </div>
          </div>
        </main>

        <footer className="container mx-auto mt-12 border-t border-amber-200 px-6 py-8 text-sm text-amber-700">
          <div className="flex justify-center gap-8">
            <Link href="#" className="transition-colors hover:text-amber-900">
              Privacy
            </Link>
            <Link href="#" className="transition-colors hover:text-amber-900">
              Terms
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

function FeatureCard({ Icon, title, text }: FeatureCardProps) {
  return (
    <div className="transform rounded-xl bg-white p-8 text-center shadow-lg transition-transform duration-200 hover:scale-105">
      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
        <Icon className="h-8 w-8 text-amber-600" />
      </div>
      <h3 className="mb-3 text-xl font-semibold">{title}</h3>
      <p className="text-amber-700">{text}</p>
    </div>
  );
}
