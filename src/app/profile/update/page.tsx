"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { FiArrowLeft, FiUser } from "react-icons/fi";

export default function UpdateProfilePage() {
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
      <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0] px-4 py-12">
        <div className="w-full max-w-lg animate-pulse rounded-2xl border border-[#dfe8df] bg-white p-7">
          <div className="h-7 w-48 rounded bg-gray-200" />
          <div className="mt-6 h-12 rounded-lg bg-gray-200" />
          <div className="mt-4 h-12 rounded-lg bg-gray-200" />
        </div>
      </main>
    );
  }

  return <UpdateProfileForm initialName={user.name || ""} />;
}

function UpdateProfileForm({ initialName }: { initialName: string }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedName = name.trim();

    if (!updatedName) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    if (updatedName.length > 100) {
      toast.error("নাম ১০০ অক্ষরের মধ্যে রাখুন।");
      return;
    }

    if (updatedName === initialName) {
      toast.error("আপনার নাম পরিবর্তন করুন।");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: updatedName,
      });

      if (error) {
        toast.error(error.message || "তথ্য আপডেট করা যায়নি।");
        return;
      }

      toast.success("আপনার নাম সফলভাবে আপডেট হয়েছে!");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-12">
      <div className="mx-auto w-full max-w-lg">
        <Link
          href="/profile"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 transition hover:text-green-800"
        >
          <FiArrowLeft />
          প্রোফাইলে ফিরে যান
        </Link>

        <section className="rounded-2xl border border-[#dfe8df] bg-[#fbfdfb] p-5 sm:p-7">
          <h1 className="text-2xl font-extrabold text-[#26332a]">
            তথ্য আপডেট করুন
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            আপনার প্রোফাইলের নাম পরিবর্তন করুন।
          </p>

          <form onSubmit={handleUpdate} className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-[#26332a]"
              >
                নাম
              </label>

              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-gray-400" />

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="আপনার নাম লিখুন"
                  autoComplete="name"
                  maxLength={100}
                  required
                  className="w-full rounded-lg border border-[#dfe8df] bg-transparent py-3 pl-10 pr-3 text-sm text-[#26332a] outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !name.trim() || name.trim() === initialName}
              className="w-full rounded-lg bg-green-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "আপডেট হচ্ছে..." : "Update Information"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
