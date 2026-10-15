
export default function ProductDetailsLoading() {
  return (
    <main className="mx-auto w-full max-w-7xl animate-pulse px-4 py-8 sm:px-6">
      <div className="h-5 w-40 rounded bg-gray-200" />

      <section className="mt-6 grid gap-8 rounded-3xl border border-gray-200 p-5 sm:p-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="min-h-56 rounded-2xl bg-gray-200 sm:min-h-72" />

        <div className="space-y-5 py-3">
          <div className="h-8 w-32 rounded-full bg-gray-200" />
          <div className="h-10 w-3/4 rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-32 rounded-2xl bg-gray-200" />
        </div>
      </section>

      <div className="mt-10 h-8 w-48 rounded bg-gray-200" />

      <section className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-32 rounded-2xl border border-gray-200 bg-gray-100"
          />
        ))}
      </section>

      <div className="mt-10 h-8 w-56 rounded bg-gray-200" />

      <div className="mt-5 space-y-3">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="h-20 rounded-2xl bg-gray-100" />
        ))}
      </div>
    </main>
  );
}
