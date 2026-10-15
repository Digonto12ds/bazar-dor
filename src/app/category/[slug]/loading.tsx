
export default function CategoryLoading() {
  return (
    <main className="mx-auto w-full max-w-7xl animate-pulse px-4 py-8 sm:px-6 sm:py-10">
      {/* Breadcrumb skeleton */}
      <div className="mb-6 h-4 w-32 rounded bg-gray-200" />

      {/* Category heading skeleton */}
      <div className="mb-7 flex items-center gap-4 rounded-2xl border border-gray-200 p-5 sm:p-7">
        <div className="h-14 w-14 shrink-0 rounded-xl bg-gray-200 sm:h-16 sm:w-16" />

        <div className="flex-1 space-y-3">
          <div className="h-7 w-40 rounded bg-gray-200" />
          <div className="h-4 w-64 max-w-full rounded bg-gray-200" />
        </div>
      </div>

      {/* Sort control skeleton */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="h-4 w-24 rounded bg-gray-200" />
        <div className="h-10 w-48 max-w-[60%] rounded-xl bg-gray-200" />
      </div>

      {/* Product cards skeleton */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 bg-white p-3"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gray-200" />

              <div className="flex-1 space-y-2">
                <div className="h-4 w-28 max-w-full rounded bg-gray-200" />
                <div className="h-3 w-20 rounded bg-gray-200" />
              </div>
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div className="space-y-2">
                <div className="h-3 w-16 rounded bg-gray-200" />
                <div className="h-5 w-24 rounded bg-gray-200" />
              </div>

              <div className="h-6 w-14 rounded-full bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
