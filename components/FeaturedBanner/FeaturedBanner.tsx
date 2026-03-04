import Image from "next/image";
import { Button } from "@/components/ui/button";

export function FeaturedBanner() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background */}
      <div className="relative w-full h-[320px] sm:h-[260px] lg:h-[600px]">
        {/* Mobile Image */}
        <div className="w-full flex justify-center lg:hidden">
          <Image
            src="/Photos Industry/3.jpg"
            alt="hero"
            width={600}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Desktop Image */}
        <Image
          src="/Photos Industry/24.png"
          alt="Jackets & Hoodies Collection"
          fill
          priority
          sizes="100vw"
          className="object-cover hidden lg:block"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 w-full h-full" />
    </section>
  );
}