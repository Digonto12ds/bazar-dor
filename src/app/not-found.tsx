import Link from "next/link";
import {
  FiArrowLeft,
  FiHome,
  FiSearch,
} from "react-icons/fi";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#f0f5f0] px-4 py-12">
      <div className="w-full max-w-xl text-center">
        {/* Illustration */}
        <div className="relative mx-auto mb-7 flex h-36 w-36 items-center justify-center rounded-full bg-[#e1eee2] sm:h-44 sm:w-44">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-[#fbfdfb] shadow-sm sm:h-28 sm:w-28">
            <span
              className="text-6xl sm:text-7xl"
              role="img"
              aria-label="বাজারের ব্যাগ"
            >
              🛒
            </span>
          </div>

          <span className="absolute -right-1 top-2 flex h-12 w-12 items-center justify-center rounded-full border-4 border-[#f0f5f0] bg-green-800 text-xl font-extrabold text-white">
            ?
          </span>

          <span className="absolute -bottom-1 -left-2 rounded-full bg-[#fbfdfb] px-3 py-1.5 text-xs font-bold text-green-800 shadow-sm">
            BazarDor
          </span>
        </div>

        {/* Error Code */}
        <p className="text-7xl font-black tracking-tight text-green-800 sm:text-8xl">
          404
        </p>

        {/* Message */}
        <h1 className="mt-4 text-2xl font-extrabold text-[#26332a] sm:text-3xl">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-600 sm:text-base">
          দুঃখিত! আপনি যে পেজটি খুঁজছেন, সেটি হয়তো সরানো হয়েছে,
          ঠিকানা পরিবর্তন হয়েছে অথবা পেজটি আর নেই।
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-green-800 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-md"
          >
            <FiHome size={17} />
            হোম পেজে ফিরে যান
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d5e2d6] bg-[#fbfdfb] px-6 py-3 text-sm font-bold text-[#26332a] transition hover:border-green-700 hover:text-green-800"
          >
            <FiSearch size={17} />
            পণ্য খুঁজুন
          </Link>
        </div>

        {/* Footer Note */}
        <div className="mt-10 border-t border-[#dce7dc] pt-5">
          <p className="text-xs text-gray-500">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
        </div>
      </div>
    </main>
  );
}
