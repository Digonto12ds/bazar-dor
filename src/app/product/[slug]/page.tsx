
import { headers } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/lib/auth";

const API_URL = "https://openapi.programming-hero.com/api/bazardor";

interface PriceChange {
  dir: "up" | "down" | "flat";
  pct: number;
}

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
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
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: PriceChange;
  markets: Market[];
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

function formatPrice(price: number) {
  return `${price.toLocaleString("bn-BD")} টাকা`;
}

function getUnitLabel(unit: string) {
  const units: Record<string, string> = {
    kg: "কেজি",
    piece: "টি",
    liter: "লিটার",
    dozen: "ডজন",
  };

  return units[unit] ?? unit;
}

function getChangeLabel(change: PriceChange) {
  const amount = Math.abs(change.pct).toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });

  if (change.dir === "up") return `▲ ${amount}%`;
  if (change.dir === "down") return `▼ ${amount}%`;

  return "— ০%";
}

function getAveragePrice(markets: Market[]) {
  if (markets.length === 0) return null;

  const total = markets.reduce(
    (sum, market) => sum + (market.min + market.max) / 2,
    0
  );

  return total / markets.length;
}

function PriceCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-xl font-bold text-gray-900">{value}</p>
      <p className="mt-1 text-xs text-gray-500">{description}</p>
    </div>
  );
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Protect this page: only signed-in users can view product details.
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(`/signin?callbackURL=${encodeURIComponent(`/product/${slug}`)}`);
  }

  // First, find the product ID using its slug.
  const listResponse = await fetch(`${API_URL}/products`, {
    cache: "no-store",
  });

  if (!listResponse.ok) {
    throw new Error("Failed to load products.");
  }

  const listJson: ApiResponse<Product[]> | Product[] =
    await listResponse.json();

  const products = unwrap<Product[]>(listJson);
  const matchedProduct = products.find((item) => item.slug === slug);

  if (!matchedProduct) {
    notFound();
  }

  // The single-product endpoint requires a numeric ID.
  const detailResponse = await fetch(
    `${API_URL}/products/${matchedProduct.id}`,
    { cache: "no-store" }
  );

  if (!detailResponse.ok) {
    throw new Error("Failed to load product details.");
  }

  const detailJson: ApiResponse<Product> | Product =
    await detailResponse.json();

  const product = unwrap<Product>(detailJson);

  const averagePrice = getAveragePrice(product.markets);
  const unitLabel = getUnitLabel(product.unit);

  const changeColor =
    product.change.dir === "up"
      ? "text-red-600 bg-red-50"
      : product.change.dir === "down"
        ? "text-green-700 bg-green-50"
        : "text-gray-600 bg-gray-100";

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-green-800 hover:text-green-600"
      >
        <span aria-hidden="true">←</span> বাজারে ফিরে যান
      </Link>

      {/* Product summary */}
      <section className="mt-6 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:p-10">
          <div className="flex min-h-56 items-center justify-center rounded-2xl bg-green-50 sm:min-h-72">
            <span className="text-8xl sm:text-9xl" role="img" aria-label={product.nameBn}>
              {product.image}
            </span>
          </div>

          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-sm font-medium text-green-800">
              <span>{product.categoryIcon}</span>
              {product.categoryNameBn}
            </span>

            <h1 className="mt-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
              {product.nameBn}
            </h1>

            <p className="mt-3 text-sm text-gray-500">
              বাজারভেদে দামের তুলনা করুন এবং আজকের বাজারদর জানুন।
            </p>

            <div className="mt-6 rounded-2xl bg-gray-50 p-5">
              <p className="text-sm text-gray-500">আজকের বাজারদর</p>

              <div className="mt-2 flex flex-wrap items-baseline gap-3">
                <span className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  {formatPrice(product.today)}
                </span>
                <span className="text-sm text-gray-500">
                  / {unitLabel}
                </span>
              </div>

              <span
                className={`mt-3 inline-flex rounded-full px-3 py-1.5 text-sm font-semibold ${changeColor}`}
              >
                {getChangeLabel(product.change)}
                <span className="ml-2 font-normal">
                  গতকালের তুলনায়
                </span>
              </span>
            </div>

            <p className="mt-4 text-sm leading-6 text-gray-500">
              সর্বশেষ বাজারদরের তথ্য দেখে কেনাকাটার সিদ্ধান্ত নিন।
            </p>
          </div>
        </div>
      </section>

      {/* Price overview */}
      <section className="mt-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            দামের সারসংক্ষেপ
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            বিভিন্ন বাজারের দামের ভিত্তিতে হিসাব করা হয়েছে।
          </p>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <PriceCard
            title="সর্বনিম্ন দাম"
            value={
              product.markets.length
                ? formatPrice(
                    Math.min(...product.markets.map((market) => market.min))
                  )
                : "তথ্য নেই"
            }
            description={`প্রতি ${unitLabel}`}
          />

          <PriceCard
            title="সর্বোচ্চ দাম"
            value={
              product.markets.length
                ? formatPrice(
                    Math.max(...product.markets.map((market) => market.max))
                  )
                : "তথ্য নেই"
            }
            description={`প্রতি ${unitLabel}`}
          />

          <PriceCard
            title="গড় বাজারদর"
            value={
              averagePrice === null
                ? "তথ্য নেই"
                : formatPrice(Math.round(averagePrice))
            }
            description={`প্রতিটি বাজারের সর্বনিম্ন ও সর্বোচ্চ দামের গড়ের ভিত্তিতে, প্রতি ${unitLabel}`}
          />
        </div>
      </section>

      {/* Market comparison */}
      <section className="mt-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            বাজারভিত্তিক দাম
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            বিভিন্ন বাজারে {product.nameBn}-এর দামের তুলনা।
          </p>
        </div>

        {product.markets.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
            এই পণ্যের বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি।
          </div>
        ) : (
          <>
            {/* Mobile cards */}
            <div className="mt-5 grid gap-3 md:hidden">
              {product.markets.map((market, index) => (
                <article
                  key={`${market.market}-${market.division}-${index}`}
                  className="rounded-2xl border border-gray-200 bg-white p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {market.market}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {market.division}
                      </p>
                    </div>

                    <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-800">
                      {unitLabel}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-gray-50 p-3">
                      <p className="text-xs text-gray-500">সর্বনিম্ন</p>
                      <p className="mt-1 font-bold text-gray-900">
                        {formatPrice(market.min)}
                      </p>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-3">
                      <p className="text-xs text-gray-500">সর্বোচ্চ</p>
                      <p className="mt-1 font-bold text-gray-900">
                        {formatPrice(market.max)}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Tablet and desktop table */}
            <div className="mt-5 hidden overflow-x-auto rounded-2xl border border-gray-200 md:block">
              <table className="w-full border-collapse text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                      বাজার
                    </th>
                    <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                      বিভাগ
                    </th>
                    <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                      সর্বনিম্ন দাম
                    </th>
                    <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                      সর্বোচ্চ দাম
                    </th>
                    <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                      একক
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 bg-white">
                  {product.markets.map((market, index) => (
                    <tr
                      key={`${market.market}-${market.division}-${index}`}
                      className="transition hover:bg-green-50/50"
                    >
                      <td className="px-5 py-4 font-semibold text-gray-900">
                        {market.market}
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {market.division}
                      </td>
                      <td className="px-5 py-4 font-medium text-green-800">
                        {formatPrice(market.min)}
                      </td>
                      <td className="px-5 py-4 font-medium text-gray-900">
                        {formatPrice(market.max)}
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {unitLabel}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>

      <div className="mt-10">
        <Link
          href="/"
          className="inline-flex rounded-xl bg-green-800 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          ← সব পণ্য দেখুন
        </Link>
      </div>
    </main>
  );
}
