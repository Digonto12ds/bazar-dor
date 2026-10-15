
import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
// import UserInfo from "./UserInfo";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="mx-auto w-full max-w-7xl px-4 py-4">
      {/* Top Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Logo + Date */}
        <div className="flex items-center gap-2">
          <div>
            <Image
              className="rounded-xl bg-green-700"
              src="/logo-icon.png"
              alt="বাজার দর"
              width={48}
              height={48}
              priority
            />
          </div>

          <div className="flex flex-col items-start">
            <span className="text-2xl font-bold text-black">
              বাজার দর
            </span>
            <span className="text-xs text-neutral-500">
              {date}
            </span>
          </div>
        </div>

        {/* Authentication Buttons */}
        <div className="flex items-center gap-2">
          <Link
            href="/signin"
            className="rounded-lg border border-green-800 px-4 py-2 text-sm font-semibold text-green-800 transition hover:bg-green-50 sm:px-5 sm:text-base"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-green-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 sm:px-5 sm:text-base"
          >
            সাইন আপ
          </Link>

          {/* When authentication is implemented, show UserInfo instead */}
          {/* <UserInfo /> */}
        </div>
      </div>

      {/* Category Navigation */}
      <NavLinks />
    </header>
  );
};

export default Header;