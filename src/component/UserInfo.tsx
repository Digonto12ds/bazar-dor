"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  FiChevronDown,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

const UserInfo = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown with Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSignout = async () => {
    setLoading(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি।");
        return;
      }

      setOpen(false);
      toast.success("সফলভাবে সাইন আউট হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="h-10 w-32 animate-pulse rounded-lg bg-gray-200" />
    );
  }

  // Guest buttons
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/signin"
          className="rounded-lg border border-green-800 px-3 py-2 text-sm font-semibold text-green-800 transition hover:bg-green-50 sm:px-4"
        >
          সাইন ইন
        </Link>

        <Link
          href="/signup"
          className="rounded-lg bg-green-800 px-3 py-2 text-sm font-semibold text-white transition hover:bg-green-700 sm:px-4"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className="relative">
      {/* Profile Dropdown Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex max-w-55 items-center gap-2 rounded-full px-2 py-1.5 transition hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-green-700"
      >
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-green-100 bg-green-50">
          <Image
            src={user.image || "/default-avatar.png"}
            alt={user.name || "User avatar"}
            fill
            sizes="36px"
            className="object-cover"
          />
        </div>

        <span className="max-w-25 truncate text-sm font-semibold text-[#26332a]">
          {user.name || "ব্যবহারকারী"}
        </span>

        <FiChevronDown
          className={`shrink-0 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-[#e0e8e0] bg-white shadow-xl"
        >
          {/* User Details */}
          <div className="border-b border-gray-100 bg-[#f7faf7] px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-green-100 bg-green-50">
                <Image
                  src={user.image || "/default-avatar.png"}
                  alt={user.name || "User avatar"}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-[#26332a]">
                  {user.name || "ব্যবহারকারী"}
                </p>
                <p className="truncate text-xs text-gray-500">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Links */}
          <div className="p-2">
            <Link
              href="/profile"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-800"
            >
              <FiUser className="text-base" />
              আমার প্রোফাইল
            </Link>
          </div>

          {/* Sign Out */}
          <div className="border-t border-gray-100 p-2">
            <button
              type="button"
              role="menuitem"
              onClick={handleSignout}
              disabled={loading}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-60"
            >
              <FiLogOut className="text-base" />
              {loading ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
