import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Flower2,
} from "lucide-react";
import Image from "next/image";
import PartnerLogo from "@/components/home/partner-logo";


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

          <div className="mx-auto mb-16 max-w-4xl text-center">
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
