import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <section className="w-full bg-white py-8">
      <div className="mx-auto flex min-h-[500px] w-full max-w-7xl items-center rounded-3xl border border-neutral-200 bg-white px-8 py-12 md:px-10 lg:min-h-[560px]">
        
        {/* Left Content */}
        <div className="w-1/2">
          
          {/* Eyebrow */}
          <p className="w-fit rounded-2xl bg-green-100 px-3 py-1 text-sm font-semibold text-green-600">
            {date}
          </p>

          {/* Main Heading */}
          <h1 className="mt-4 max-w-xl text-4xl font-bold leading-tight text-neutral-900 md:text-5xl lg:text-6xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-lg text-base leading-7 text-neutral-600 md:text-lg">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* CTA */}
          <Link
            href="#সব-পণ্য"
            className="mt-8 inline-flex items-center rounded-lg bg-green-800 px-6 py-3 font-semibold text-white transition hover:bg-green-600"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        {/* Right Banner Image */}
        <div className="flex w-1/2 justify-end">
          <div className="relative h-[430px] w-[520px] overflow-hidden rounded-3xl">
            <Image
              src="/bazar-hero.png"
              alt="বাজারের পণ্য"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;