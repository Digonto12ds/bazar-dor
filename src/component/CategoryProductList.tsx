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
    <section>
      {/* Results and sort control */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-500">
          মোট{" "}
          <span className="font-bold text-gray-900">
            {products.length.toLocaleString("bn-BD")}
          </span>{" "}
          টি পণ্য
        </p>

        <div className="flex items-center gap-3">
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
            className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100 sm:flex-none"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Product grid */}
      {sortedProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-12 text-center">
          <p className="text-lg font-bold text-gray-800">
            কোনো পণ্য পাওয়া যায়নি!
          </p>

          <Link
            href="/"
            className="mt-5 inline-flex rounded-xl bg-green-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
