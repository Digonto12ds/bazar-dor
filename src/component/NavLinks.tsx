import Link from "next/link";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
  );

  const data = await res.json();

  const categories: Category[] = data;

  return (
    <nav className="mt-4 w-full overflow-x-auto sm:mt-5">
      <div className="flex w-max min-w-full gap-2 pb-2">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="shrink-0 rounded-full px-3 py-2 text-xs font-medium text-neutral-600 transition hover:bg-red-50 hover:text-red-600 sm:px-4 sm:text-sm"
          >
            {category.icon} {category.nameBn}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavLinks;
