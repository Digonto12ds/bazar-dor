import Link from "next/link";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string
}

const NavLinks = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
  );

  const data = await res.json();

  const categories: Category[] = data;

  return (
    <div className='flex gap-2 mt-5'>
      {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="rounded-full px-4 py-2 text-sm font-medium text-neutral-600 transition hover:bg-red-50 hover:text-red-600"
          >
           {category.icon} {category.nameBn}
          </Link>
        ))}
    </div>
  );
};

export default NavLinks;
