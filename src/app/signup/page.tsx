"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (!name || !email || !password || !confirmPassword) {
      toast.error("সবগুলো তথ্য পূরণ করুন।");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না।");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।");
        return;
      }

      if (data) {
        toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এবার সাইন ইন করুন।");
        router.push("/signin");
      }
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = async (provider: "google" | "github") => {
    setSocialLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "সোশ্যাল সাইন আপ করা যায়নি।");
      }
    } catch {
      toast.error("সোশ্যাল লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setSocialLoading("");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0] px-3 py-6 sm:px-5 sm:py-10">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center sm:mb-6">
          <h1 className="text-xl font-extrabold tracking-tight text-[#26332a] sm:text-2xl">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-[#788078] sm:text-sm">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন
          </p>
        </div>

        <div className="rounded-xl border border-[#dfe8df] bg-[#fbfdfb] p-4 shadow-sm sm:rounded-2xl sm:p-6">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-[#26332a]"
              >
                নাম
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="যেমন: রহিম উদ্দিন"
                autoComplete="name"
                required
                className="w-full min-w-0 rounded-lg border border-[#dfe8df] bg-transparent px-3 py-3 text-sm text-[#26332a] outline-none transition placeholder:text-gray-500 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-[#26332a]"
              >
                ইমেইল
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full min-w-0 rounded-lg border border-[#dfe8df] bg-transparent px-3 py-3 text-sm text-[#26332a] outline-none transition placeholder:text-gray-500 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-[#26332a]"
              >
                পাসওয়ার্ড
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full min-w-0 rounded-lg border border-[#dfe8df] bg-transparent px-3 py-3 text-sm text-[#26332a] outline-none transition placeholder:text-gray-500 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-sm font-medium text-[#26332a]"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="আবার লিখুন"
                autoComplete="new-password"
                required
                className="w-full min-w-0 rounded-lg border border-[#dfe8df] bg-transparent px-3 py-3 text-sm text-[#26332a] outline-none transition placeholder:text-gray-500 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !!socialLoading}
              className="w-full rounded-lg bg-[#07883e] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#067433] disabled:cursor-not-allowed disabled:opacity-60 sm:py-3.5"
            >
              {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </form>

          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#dfe8df]" />
            <span className="shrink-0 text-xs text-gray-500">অথবা</span>
            <div className="h-px flex-1 bg-[#dfe8df]" />
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <button
              type="button"
              disabled={loading || !!socialLoading}
              onClick={() => handleSocialSignup("google")}
              className="flex min-w-0 items-center justify-center gap-1.5 rounded-lg border border-[#dfe8df] px-2 py-3 text-xs font-semibold leading-4 text-[#26332a] transition hover:bg-[#f0f5f0] disabled:cursor-not-allowed disabled:opacity-60 sm:gap-2 sm:px-3 sm:text-sm"
            >
              <FcGoogle className="shrink-0 text-base sm:text-lg" />
              <span className="min-w-0 text-center">
                {socialLoading === "google"
                  ? "অপেক্ষা করুন..."
                  : "Google দিয়ে চালিয়ে যান"}
              </span>
            </button>

            <button
              type="button"
              disabled={loading || !!socialLoading}
              onClick={() => handleSocialSignup("github")}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-[#dfe8df] px-2 py-2.5 text-xs font-semibold text-[#26332a] transition hover:bg-[#f0f5f0] disabled:opacity-60"
            >
              <FaGithub className="shrink-0 text-base sm:text-lg" />
              <span>
                {socialLoading === "github"
                  ? "অপেক্ষা করুন..."
                  : "GitHub দিয়ে চালিয়ে যান"}
              </span>
            </button>
          </div>

          <p className="mt-5 text-center text-xs leading-5 text-[#59645b] sm:text-sm">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="font-semibold text-[#07883e] hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        <div className="mt-5 text-center">
          <Link
            href="/"
            className="inline-block px-2 py-1 text-xs text-[#788078] transition hover:text-[#07883e] sm:text-sm"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}
