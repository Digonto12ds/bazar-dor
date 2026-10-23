import Image from "next/image";
import NavLinks from "./NavLinks";
import UserInfo from "./UserInfo";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="mx-auto w-full max-w-7xl px-3 py-3 sm:px-5 sm:py-4 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div>
            <Image
              className="rounded-xl bg-green-700"
              src="/logo-icon.png"
              alt="বাজার দর"
              width={48}
              height={48}
              priority
              sizes="(max-width: 640px) 40px, 48px"
            />
          </div>

          <div className="flex min-w-0 flex-col items-start">
            <span className="text-lg font-bold text-black sm:text-2xl">
              বাজার দর
            </span>
            <span className="text-[10px] leading-4 text-neutral-500 sm:text-xs">
              {date}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center">
          <UserInfo />
        </div>
      </div>

      <div className="mt-3 sm:mt-4">
        <NavLinks />
      </div>
    </header>
  );
};

export default Header;
