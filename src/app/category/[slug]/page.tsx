import Link from "next/link";
import CategoryProductList from "@/component/CategoryProductList";

const API_URL =
  "https://openapi.programming-hero.com/api/bazardor";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

interface ApiResponse<T> {
  data?: T;
}

function unwrap<T>(response: ApiResponse<T> | T): T {
  if (
    response !== null &&
    typeof response === "object" &&
    "data" in response
  ) {
    return response.data as T;
  }

  return response as T;
}

async function getCategory(slug: string): Promise<Category | null> {
  try {
    const response = await fetch(
      `${API_URL}/categories/${encodeURIComponent(slug)}`,
      { next: { revalidate: 300 } }
    );

    if (!response.ok) return null;

    const json: ApiResponse<Category> | Category =
      await response.json();

    const category = unwrap<Category>(json);

    if (!category || category.slug !== slug) return null;

    return category;
  } catch {
    return null;
  }
}

async function getCategoryProducts(
  slug: string
): Promise<Product[] | null> {
  try {
    const response = await fetch(
      `${API_URL}/products?category=${encodeURIComponent(slug)}`,
      { next: { revalidate: 300 } }
    );

    if (!response.ok) return null;

    const json: ApiResponse<Product[]> | Product[] =
      await response.json();

    return unwrap<Product[]>(json);
  } catch {
    return null;
  }
}

function EmptyCategory() {
  return (
    <main className="mx-auto flex min-h-[55vh] w-full max-w-7xl items-center justify-center px-4 py-12">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-green-50 text-4xl">
          🛒
        </div>

        <h1 className="mt-6 text-2xl font-bold text-gray-900">
          কোনো পণ্য পাওয়া যায়নি!
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          এই ক্যাটাগরিটি পাওয়া যায়নি অথবা এখানে এখনো কোনো পণ্য নেই।
          অন্য পণ্য দেখতে হোম পেজে ফিরে যান।
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-green-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [category, products] = await Promise.all([
    getCategory(slug),
    getCategoryProducts(slug),
  ]);

  // Invalid category or failed product request.
  if (!category || !products || products.length === 0) {
  return <EmptyCategory />;
}

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="transition hover:text-green-800">
          হোম
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{category.nameBn}</span>
      </nav>

      {/* Category heading */}
      <header className="mb-7 rounded-2xl border border-[#e0e8e1] bg-[#fbfdfb] p-5 sm:p-7">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-50 text-3xl sm:h-16 sm:w-16 sm:text-4xl">
            {category.icon}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#26332a] sm:text-3xl">
              {category.nameBn}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              এই ক্যাটাগরির সব পণ্যের আজকের বাজারদর দেখুন।
            </p>
          </div>
        </div>
      </header>

      {/* Sorting and product cards */}
      <CategoryProductList products={products} />
    </main>
  );
}
