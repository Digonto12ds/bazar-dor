
import ProductCard from "./ProductCard";

const API_URL =
  "https://openapi.programming-hero.com/api/bazardor";

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

interface ApiResponse<T> {
  data?: T;
}

function getData<T>(response: ApiResponse<T> | T): T {
  if (
    response !== null &&
    typeof response === "object" &&
    "data" in response
  ) {
    return response.data as T;
  }

  return response as T;
}

function ProductSection({
  title,
  subtitle,
  products,
  id,
}: {
  title: string;
  subtitle: string;
  products: Product[];
  id?: string;
}) {
  return (
    <section id={id} className="mt-12 scroll-mt-6 sm:mt-16">
      <div className="mb-4">
        <h2 className="text-base font-bold text-[#26332a] sm:text-lg">
          {title}
        </h2>

        <p className="mt-2 text-xs text-gray-500 sm:text-sm">
          {subtitle}
        </p>
      </div>

      {products.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-6 text-center text-sm text-gray-500">
          এই মুহূর্তে কোনো পণ্যের তথ্য পাওয়া যায়নি।
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default async function ProductSections() {
  const response = await fetch(`${API_URL}/products`, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
  }

  const json: ApiResponse<Product[]> | Product[] =
    await response.json();

  const products = getData<Product[]>(json);

 
  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  
  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort(
      (a, b) =>
        Math.abs(b.change.pct) - Math.abs(a.change.pct)
    )
    .slice(0, 6);

  return (
    <div className="pb-12">
      <ProductSection
        title="🔺 আজ দাম বেড়েছে"
        subtitle="যেসব পণ্যের দাম আজ সবচেয়ে বেশি বেড়েছে, সেগুলো দেখুন।"
        products={risers}
      />

      <ProductSection
        title="🟢 আজ দাম কমেছে"
        subtitle="যেসব পণ্যের দাম আজ সবচেয়ে বেশি কমেছে, সেগুলো দেখুন।"
        products={fallers}
      />

      <ProductSection
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle={`মোট ${products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে`}
        products={products}
      />
    </div>
  );
}
