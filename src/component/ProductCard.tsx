import Link from "next/link";

interface PriceChange {
  dir: "up" | "down" | "flat";
  pct: number;
}

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  change: PriceChange;
}

interface ProductCardProps {
  product: Product;
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

function formatPrice(price: number) {
  return price.toLocaleString("bn-BD");
}

function getChangeStyle(dir: PriceChange["dir"]) {
  if (dir === "up") {
    return "bg-green-50 text-green-700";
  }

  if (dir === "down") {
    return "bg-red-50 text-red-600";
  }

  return "bg-gray-100 text-gray-500";
}

function getChangeText(change: PriceChange) {
  const percent = Math.abs(change.pct).toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });

  if (change.dir === "up") return `▲ ${percent}%`;
  if (change.dir === "down") return `▼ ${percent}%`;

  return "— ০.০%";
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.id}`}
      aria-label={`${product.nameBn} পণ্যের বিস্তারিত দেখুন`}
      className="group flex flex-col rounded-xl border border-[#e0e8e1] bg-[#fbfdfb] p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-green-300 hover:shadow-md"
    >
      {/* Product image and information */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0]">
          <span className="text-xl" role="img" aria-label={product.nameBn}>
            {product.image}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-bold leading-5 text-[#26332a] group-hover:text-green-800">
            {product.nameBn}
          </h3>

          <p className="mt-0.5 text-[11px] leading-4 text-gray-500">
            {getUnitLabel(product.unit)}
          </p>
        </div>
      </div>

      {/* Today's price and percentage badge */}
      <div className="mt-3 flex items-end justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[10px] leading-4 text-gray-500">আজকের দাম</p>

          <p className="mt-0.5 text-sm font-bold leading-5 text-[#26332a]">
            {formatPrice(product.today)} টাকা
          </p>
        </div>

        <span
          className={`mb-0.5 inline-flex shrink-0 items-center rounded-full px-2 py-1 text-[10px] font-bold leading-none ${getChangeStyle(product.change.dir)}`}
        >
          {getChangeText(product.change)}
        </span>
      </div>
    </Link>
  );
}
