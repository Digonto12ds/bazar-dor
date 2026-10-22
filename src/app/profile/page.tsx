"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FiArrowLeft, FiEdit, FiMail, FiUser } from "react-icons/fi";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/signin");
    }
  }, [isPending, user, router]);

  if (isPending || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0] px-4">
        <div className="w-full max-w-lg animate-pulse rounded-2xl border border-[#dfe8df] bg-white p-8">
          <div className="mx-auto h-20 w-20 rounded-full bg-gray-200" />
          <div className="mx-auto mt-5 h-5 w-40 rounded bg-gray-200" />
          <div className="mx-auto mt-3 h-4 w-52 rounded bg-gray-200" />
          <div className="mt-8 h-11 rounded-lg bg-gray-200" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 transition hover:text-green-800"
        >
          <FiArrowLeft />
          হোম পেজে ফিরে যান
        </Link>

        <header className="mb-6">
          <h1 className="text-2xl font-extrabold text-[#26332a] sm:text-3xl">
            আমার প্রোফাইল
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য দেখুন ও আপডেট করুন।
          </p>
        </header>

        <section className="rounded-2xl border border-[#dfe8df] bg-[#fbfdfb] p-5 sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-[#dfe8df] bg-green-50">
              <Image
                src={user.image || "/default-avatar.png"}
                alt={user.name || "Profile avatar"}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="wrap-break-word text-xl font-bold text-[#26332a]">
                {user.name}
              </h2>
              <p className="mt-1 break-all text-sm text-gray-500">
                {user.email}
              </p>
              <span className="mt-3 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                নিবন্ধিত ব্যবহারকারী
              </span>
            </div>

            <Link
              href="/profile/update"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-green-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              <FiEdit />
              আপডেট করুন
            </Link>
          </div>

          <div className="mt-7 space-y-4 border-t border-[#e5ebe5] pt-6">
            <div className="flex items-start gap-3">
              <FiUser className="mt-1 text-lg text-green-800" />
              <div>
                <p className="text-xs text-gray-500">নাম</p>
                <p className="mt-1 text-sm font-medium text-[#26332a]">
                  {user.name}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FiMail className="mt-1 text-lg text-green-800" />
              <div>
                <p className="text-xs text-gray-500">ইমেইল</p>
                <p className="mt-1 break-all text-sm font-medium text-[#26332a]">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
