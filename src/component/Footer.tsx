import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#dfe8df] bg-[#f0f5f0]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between">
        {/* Left: Brand & Description */}
        <Link
          href="/"
          className="text-sm font-semibold text-[#26332a] transition hover:text-green-800"
        >
          বাজার দর
          <span className="font-normal text-gray-500">
            {" "}— প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </span>
        </Link>

        {/* Right: Disclaimer */}
        <p className="text-xs leading-5 text-gray-500 md:max-w-md md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}