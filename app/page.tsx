import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  CloudRain,
  Flower2,
  Shield,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

type FeatureCardProps = {
  Icon: LucideIcon;
  title: string;
  text: string;
};

const features: FeatureCardProps[] = [
  {
    Icon: CloudRain,
    title: "Suivi climat et floraison",
    text: "Surveillez les facteurs environnementaux qui impactent directement votre production de miel",
  },
  {
    Icon: TrendingUp,
    title: "Notation standard 1-3",
    text: "Un barème simple pour chaque facteur de risque rend le suivi cohérent et facile",
  },
  {
    Icon: Shield,
    title: "Score de risque automatique",
    text: "Obtenez instantanément un score global et des conseils actionnables pour votre rucher",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen text-amber-900">
      <div className="relative flex min-h-screen flex-col">
        <header className="container mx-auto flex items-center justify-between px-6 py-8">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 animate-bounce">
              <Image
                src="/images/favicon-96x96.png"
                alt="Beekeeping Tool"
                fill
                className="object-contain"
                sizes="40px"
                priority
              />
            </div>
            <span className="text-2xl font-bold">Beekeeping Tool</span>
          </div>

          <Button asChild variant="secondary">
            <Link href="/sign-in">Se connecter</Link>
          </Button>
        </header>

        <main className="container mx-auto flex-1 px-6 py-16">
          <div className="mx-auto mb-20 max-w-4xl text-center">
            <h1 className="pt-12 text-5xl font-bold md:text-6xl">
              Anticipez votre production de miel
            </h1>

            <p className="mb-8 mx-auto max-w-2xl text-xl text-amber-800">
              Suivez le climat, les maladies et la floraison pour prendre des
              décisions éclairées sur la production de votre rucher.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild>
                <Link href="/sign-in">Commencer</Link>
              </Button>
            </div>
          </div>

          <div className="mx-auto mb-20 grid max-w-5xl gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>

          <div className="mx-auto mb-16 max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
              Ils nous font confiance
            </p>
            <h3 className="mt-2 text-2xl font-bold text-amber-900">
              Partenaires
            </h3>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <PartnerLogo
                src="/images/tranoben-ny-tantsaha.png"
                alt="Tranoben Ny Tantsaha"
              />
              <PartnerLogo
                src="/images/forest-farm-facility.png"
                alt="Forest Farm Facility"
              />
              <PartnerLogo src="/images/ispm.png" alt="ISPM" />
            </div>
          </div>
        </main>

        <footer className="container mx-auto mt-12 border-t border-amber-200 px-6 py-8 text-sm text-amber-700">
          <div className="text-center text-amber-700">
            <div className="inline-flex items-center gap-2">
              <Flower2 className="h-5 w-5" />
              <span className="text-sm">
                Des décisions apicoles plus sereines, un rapport à la fois
              </span>
              <Flower2 className="h-5 w-5" />
            </div>
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

function PartnerLogo({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex items-center justify-center rounded-xl bg-white px-8 py-6 shadow-sm ring-1 ring-amber-100/80">
      <div className="relative h-16 w-52">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="300px"
          priority
        />
      </div>
    </div>
  );
}
