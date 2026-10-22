import React from "react";

export default function Loading() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#f0f5f0] px-4 py-12">
      <div className="flex flex-col items-center text-center">

        {/* Shopping Icon */}
        <div className="relative mb-7 flex h-24 w-24 items-center justify-center rounded-3xl bg-[#e1eee2] sm:h-28 sm:w-28">
          <span
            className="text-5xl sm:text-6xl"
            role="img"
            aria-label="বাজারের ব্যাগ"
          >
            🛒
          </span>

          {/* Small Loading Spinner */}
          <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#fbfdfb] shadow-sm">
            <span className="h-5 w-5 animate-spin rounded-full border-[3px] border-[#d5e2d6] border-t-green-800" />
          </span>
        </div>

        {/* Brand */}
        <h1 className="text-2xl font-extrabold tracking-tight text-[#26332a] sm:text-3xl">
          বাজার <span className="text-green-800">দর</span>
        </h1>

        {/* Loading Spinner */}
        <div className="relative mt-7 h-12 w-12">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-[#dce8dc] border-t-green-800" />

          <div className="absolute inset-2 animate-spin rounded-full border-[3px] border-[#e1eee2] border-b-green-600 [animation-direction:reverse] [animation-duration:1.2s]" />
        </div>

        {/* Loading Text */}
        <p className="mt-5 text-sm font-bold text-[#26332a]">
          লোড হচ্ছে...
        </p>

        <p className="mt-2 text-xs text-gray-500 sm:text-sm">
          আপনার প্রয়োজনীয় পণ্যের দাম খুঁজে আনা হচ্ছে
        </p>

        {/* Animated Dots */}
        <div className="mt-4 flex items-center gap-1.5">
          <span className="h-2 w-2 animate-bounce rounded-full bg-green-800 [animation-delay:0ms]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-green-700 [animation-delay:150ms]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-green-600 [animation-delay:300ms]" />
        </div>

        {/* Footer */}
        <p className="mt-8 text-[11px] text-gray-400">
          প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
      </div>
    </main>
  );
}
