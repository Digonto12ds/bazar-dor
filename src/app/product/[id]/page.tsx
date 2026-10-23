import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FiArrowLeft,
  FiTrendingUp,
  FiTrendingDown,
  FiMinus,
  FiMapPin,
} from "react-icons/fi";

const API_URL = "https://openapi.programming-hero.com/api/bazardor";

interface PriceChange {
  dir: "up" | "down" | "flat";
  pct: number;
}

interface Market {
  market?: string;
  name?: string;
  bazar?: string;
  division?: string;
  district?: string;
  min?: number;
  max?: number;
  price?: number;
  avg?: number;
  average?: number;
}

interface Product {
  id: number;
  slug?: string;
  nameBn: string;
  category?: string;
  categoryNameBn?: string;
  categoryIcon?: string;
  unit: string;
  image: string;
  today: number;
  yesterday?: number;
  lastWeek?: number;
  lastMonth?: number;
  change: PriceChange;
  markets?: Market[];
  min?: number;
  max?: number;
  avg?: number;
  average?: number;
  description?: string;
}

function getProduct(payload: unknown): Product | null {
  if (!payload || typeof payload !== "object") return null;

  const response = payload as {
    data?: unknown;
    product?: unknown;
  };

  const raw = response.data ?? response.product ?? payload;

  if (!raw || typeof raw !== "object") return null;

  const product = raw as Product;

  if (
    typeof product.id !== "number" ||
    typeof product.nameBn !== "string" ||
    typeof product.today !== "number"
  ) {
    return null;
  }

  return product;
}

function formatPrice(price: number) {
  return price.toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });
}

function getUnitLabel(unit: string) {
  const units: Record<string, string> = {
    kg: "প্রতি কেজি",
    liter: "প্রতি লিটার",
    litre: "প্রতি লিটার",
    piece: "প্রতি পিস",
    pcs: "প্রতি পিস",
    dozen: "প্রতি ডজন",
  };

  return units[unit.toLowerCase()] ?? `প্রতি ${unit}`;
}

function getMarketName(market: Market) {
  return market.market ?? market.bazar ?? market.name ?? "স্থানীয় বাজার";
}

function getMarketAverage(market: Market): number | null {
  if (typeof market.avg === "number") return market.avg;
  if (typeof market.average === "number") return market.average;
  if (typeof market.price === "number") return market.price;

  if (typeof market.min === "number" && typeof market.max === "number") {
    return (market.min + market.max) / 2;
  }

  return null;
}

function SummaryCard({
  title,
  price,
  color,
}: {
  title: string;
  price: number;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-[#e0e8e1] bg-[#fbfdfb] p-4 sm:p-5">
      <p className="text-xs font-medium text-gray-500 sm:text-sm">{title}</p>

      <p className={`mt-2 text-xl font-extrabold sm:text-2xl ${color}`}>
        {formatPrice(price)}
        <span className="ml-1 text-xs font-medium text-gray-500">টাকা</span>
      </p>
    </div>
  );
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    notFound();
  }

  let response: Response;

  try {
    response = await fetch(`${API_URL}/products/${id}`, {
      next: { revalidate: 300 },
    });
  } catch {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
  }

  if (!response.ok) {
    notFound();
  }

  const payload: unknown = await response.json();
  const product = getProduct(payload);

  if (!product) {
    throw new Error("API থেকে পণ্যের তথ্য সঠিকভাবে পাওয়া যায়নি।");
  }

  const markets = product.markets ?? [];

  const minimumPrices = markets
    .map((market) => market.min)
    .filter((price): price is number => typeof price === "number");

  const maximumPrices = markets
    .map((market) => market.max)
    .filter((price): price is number => typeof price === "number");

  const marketAverages = markets
    .map(getMarketAverage)
    .filter((price): price is number => price !== null);

  const lowestPrice =
    typeof product.min === "number"
      ? product.min
      : minimumPrices.length > 0
        ? Math.min(...minimumPrices)
        : product.today;

  const highestPrice =
    typeof product.max === "number"
      ? product.max
      : maximumPrices.length > 0
        ? Math.max(...maximumPrices)
        : product.today;

  const averagePrice =
    typeof product.avg === "number"
      ? product.avg
      : typeof product.average === "number"
        ? product.average
        : marketAverages.length > 0
          ? marketAverages.reduce((total, price) => total + price, 0) /
            marketAverages.length
          : product.today;

  const direction = product.change?.dir ?? "flat";
  const percentage = Math.abs(product.change?.pct ?? 0);

  const changeText =
    direction === "up"
      ? "বেড়েছে"
      : direction === "down"
        ? "কমেছে"
        : "অপরিবর্তিত";

  const ChangeIcon =
    direction === "up"
      ? FiTrendingUp
      : direction === "down"
        ? FiTrendingDown
        : FiMinus;

  return (
    <main className="min-h-screen w-full min-w-0 overflow-x-clip bg-[#f0f5f0] px-3 py-5 sm:px-6 sm:py-8 lg:py-10">
      <div className="mx-auto w-full min-w-0 max-w-5xl">
        <Link
          href="/"
          className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-green-800 transition hover:text-green-600"
        >
          <FiArrowLeft />
          হোম পেজে ফিরে যান
        </Link>

        <section className="min-w-0 rounded-2xl border border-[#e0e8e1] bg-[#fbfdfb] p-3 sm:p-5">
          <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] sm:h-16 sm:w-16">
                <span
                  className="text-2xl sm:text-4xl"
                  role="img"
                  aria-label={product.nameBn}
                >
                  {product.image}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <h1 className="wrap-break-word text-base font-extrabold leading-snug text-[#26332a] sm:text-2xl">
                  {product.nameBn}
                </h1>

                <p className="mt-1 wrap-break-word text-xs text-gray-500 sm:text-sm">
                  {product.categoryNameBn ?? product.category ?? "পণ্য"}
                  {" · "}
                  {getUnitLabel(product.unit)}
                </p>

                <p className="mt-2 wrap-break-word text-xs leading-5 text-gray-600">
                  গতকালের তুলনায় আজকের দাম {changeText}
                  {" · "}
                  {formatPrice(product.today)} টাকা
                </p>
              </div>
            </div>

            <div className="flex w-full min-w-0 flex-row flex-wrap items-center justify-between gap-2 rounded-xl bg-[#f0f5f0] px-4 py-3 sm:w-32 sm:flex-col sm:flex-nowrap sm:justify-center sm:px-3 sm:py-4">
              <p className="text-xs text-gray-500">আজকের দাম</p>

              <p className="text-xl font-extrabold leading-tight text-[#26332a] sm:mt-1 sm:text-3xl">
                {formatPrice(product.today)}
              </p>

              <p className="text-xs text-gray-500">টাকা / {product.unit}</p>

              <span
                className={`inline-flex items-center gap-1 text-xs font-bold ${
                  direction === "up"
                    ? "text-red-600"
                    : direction === "down"
                      ? "text-green-700"
                      : "text-gray-500"
                }`}
              >
                <ChangeIcon size={12} />
                {formatPrice(percentage)}%
              </span>
            </div>
          </div>
        </section>

        <section className="mt-5 sm:mt-6">
          <h2 className="mb-3 text-base font-extrabold text-[#26332a] sm:text-lg">
            দামের সংক্ষিপ্ত বিবরণ
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
            <SummaryCard
              title="সর্বনিম্ন দাম"
              price={lowestPrice}
              color="text-green-700"
            />

            <SummaryCard
              title="সর্বোচ্চ দাম"
              price={highestPrice}
              color="text-red-600"
            />

            <SummaryCard
              title="গড় দাম"
              price={averagePrice}
              color="text-[#26332a]"
            />
          </div>
        </section>

        <section className="mt-5 w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-[#e0e8e1] bg-[#fbfdfb] sm:mt-6">
          <div className="border-b border-[#e0e8e1] px-4 py-4 sm:px-5">
            <h2 className="text-base font-extrabold text-[#26332a] sm:text-lg">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              বিভিন্ন বাজারের দামের তুলনা
            </p>
          </div>

          {markets.length > 0 ? (
            <div className="w-full min-w-0 max-w-full overflow-x-auto overscroll-x-contain">
              <table className="w-full min-w-130 border-collapse text-left text-xs sm:text-sm">
                <thead className="bg-[#f0f5f0] text-xs text-gray-600">
                  <tr>
                    <th className="px-4 py-3 font-bold sm:px-5">বাজার</th>
                    <th className="px-4 py-3 font-bold">জেলা</th>
                    <th className="px-4 py-3 text-right font-bold">
                      সর্বনিম্ন
                    </th>
                    <th className="px-4 py-3 text-right font-bold">সর্বোচ্চ</th>
                    <th className="px-4 py-3 text-right font-bold sm:px-5">
                      গড় দাম
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#e8eee8]">
                  {markets.map((market, index) => {
                    const marketAverage = getMarketAverage(market);

                    return (
                      <tr
                        key={`${getMarketName(market)}-${index}`}
                        className="transition hover:bg-[#f5f8f5]"
                      >
                        <td className="px-4 py-4 sm:px-5">
                          <div className="flex items-center gap-2 font-semibold text-[#26332a]">
                            <FiMapPin className="shrink-0 text-green-700" />
                            {getMarketName(market)}
                          </div>
                        </td>

                        <td className="px-4 py-4 text-gray-600">
                          {market.district ?? market.division ?? "—"}
                        </td>

                        <td className="px-4 py-4 text-right font-medium text-green-700">
                          {typeof market.min === "number"
                            ? formatPrice(market.min)
                            : "—"}
                        </td>

                        <td className="px-4 py-4 text-right font-medium text-red-600">
                          {typeof market.max === "number"
                            ? formatPrice(market.max)
                            : "—"}
                        </td>

                        <td className="px-4 py-4 text-right font-bold text-[#26332a] sm:px-5">
                          {marketAverage !== null
                            ? formatPrice(marketAverage)
                            : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-5 py-12 text-center">
              <span className="text-3xl" role="img" aria-label="বাজার">
                🛒
              </span>

              <p className="mt-3 font-semibold text-[#26332a]">
                এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি
              </p>

              <p className="mt-1 text-sm text-gray-500">
                আপাতত আজকের দামের তথ্য দেখানো হচ্ছে।
              </p>
            </div>
          )}
        </section>

        <p className="mt-4 px-2 text-center text-[10px] leading-5 text-gray-500 sm:text-xs">
          সকল দাম সম্ভাব্য; বাজার ও সময় অনুযায়ী পরিবর্তিত হতে পারে।
        </p>
      </div>
    </main>
  );
}
