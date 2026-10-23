import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <section className="w-full bg-white py-4 sm:py-6 lg:py-8">
      <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-col items-center gap-8 rounded-2xl border border-neutral-200 bg-white px-4 py-6 sm:px-6 sm:py-8 md:rounded-3xl md:px-8 lg:min-h-125 lg:flex-row lg:gap-8 lg:px-10 lg:py-12">
        
        <div className="w-full lg:w-1/2">
          
          <p className="w-fit max-w-full rounded-2xl bg-green-100 px-3 py-1 text-xs font-semibold text-green-600 sm:text-sm">
            {date}
          </p>

          
          <h1 className="mt-4 max-w-xl text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl md:text-5xl lg:text-6xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          
          <p className="mt-4 max-w-lg text-sm leading-6 text-neutral-600 sm:mt-6 sm:text-base sm:leading-7 md:text-lg">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          
          <Link
            href="#সব-পণ্য"
            className="mt-6 inline-flex items-center rounded-lg bg-green-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-600 sm:mt-8 sm:px-6 sm:text-base"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

       
        <div className="flex w-full justify-center lg:w-1/2 lg:justify-end">
          <div className="relative h-56 w-full max-w-xl overflow-hidden rounded-2xl sm:h-72 md:h-80 lg:h-107.5 lg:w-full lg:rounded-3xl">
            <Image
              src="/bazar-hero.png"
              alt="বাজারের পণ্য"
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
