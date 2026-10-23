"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import Link from "next/link";

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

type SortOption = "default" | "asc" | "desc";

export default function CategoryProductList({
  products,
}: {
  products: Product[];
}) {
  const [sort, setSort] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "asc") {
      result.sort((a, b) => a.today - b.today);
    }

    if (sort === "desc") {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, sort]);

  return (
    <section className="w-full min-w-0">
      {/* Results and sort control */}
      <div className="mb-5 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p className="text-sm text-gray-500 sm:text-sm">
          মোট{" "}
          <span className="font-bold text-gray-900">
            {products.length.toLocaleString("bn-BD")}
          </span>{" "}
          টি পণ্য
        </p>

        <div className="flex w-full min-w-0 items-center gap-3 sm:w-auto sm:justify-end">
          <label
            htmlFor="category-sort"
            className="shrink-0 text-sm font-medium text-gray-600"
          >
            সাজান:
          </label>

          <select
            id="category-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOption)}
            className="min-w-0 flex-1 cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-xs text-gray-800 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100 sm:w-auto sm:flex-none sm:rounded-xl sm:text-sm"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Product grid */}
      {sortedProducts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white px-4 py-10 text-center sm:rounded-2xl sm:px-6 sm:py-12">
          <p className="text-lg font-bold text-gray-800 sm:text-lg">
            কোনো পণ্য পাওয়া যায়নি!
          </p>

          <Link
            href="/"
            className="mt-5 inline-flex max-w-full items-center justify-center rounded-lg bg-green-800 px-4 py-3 text-center text-xs font-semibold text-white transition hover:bg-green-700 sm:rounded-xl sm:px-5 sm:text-sm"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      ) : (
        <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
