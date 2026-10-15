import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

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

const PriceTicker = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products"
  );

  const products: Product[] = await res.json();

  return (
    <div className="w-full border border-gray-200 bg-white text-neutral-900">
      <MarqueeText
        className=" py-2"
        direction="left"
        duration={10}
      >
        {products.map((product) => (
          <span
            key={product.id}
            className="inline-flex items-center"
          >
            <span className="text-lg">
              {product.image}
            </span>

            <span className="ml-2 font-medium text-neutral-800">
              {product.nameBn}
            </span>

            <span className="ml-2 text-neutral-600">
              {product.today} টাকা/{product.unit}
            </span>

            <span
              className={`ml-2 font-semibold ${
                product.change.dir === "up"
                  ? "text-green-600"
                  : product.change.dir === "down"
                  ? "text-red-600"
                  : "text-neutral-500"
              }`}
            >
              {product.change.dir === "up"
                ? "▲"
                : product.change.dir === "down"
                ? "▼"
                : "—"}{" "}
              {product.change.pct}%
            </span>

            <span className="mx-5 text-neutral-300">
              •
            </span>
          </span>
        ))}
      </MarqueeText>
    </div>
  );
};

export default PriceTicker;