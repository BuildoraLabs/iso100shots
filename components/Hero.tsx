import Image from "next/image";
export function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden md:min-h-screen">
      <Image
        src="/images/nature-details/purple-lotus-closeup.jpg"
        alt="Close-up of a purple lotus flower, showing rich violet petals and fine natural detail."
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/5 to-black/62" />
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/50 sm:bottom-8">
        <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
        <span className="block h-8 w-px bg-white/30" />
      </div>
    </section>
  );
}
