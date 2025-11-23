import Image from "next/image";

export default function PartnerLogo({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex items-center justify-center rounded-xl bg-white px-8 py-6 shadow-sm ring-1 ring-amber-100/80">
      <div className="relative h-20 w-64">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="400px"
          priority
        />
      </div>
    </div>
  );
}
