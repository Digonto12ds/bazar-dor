export default function ProductDetailsLoading() {
  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl animate-pulse">
        <div className="mb-5 h-4 w-36 rounded bg-gray-200" />

        <div className="rounded-2xl border border-[#dfe8df] bg-white p-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-xl bg-gray-200" />
            <div className="flex-1">
              <div className="h-5 w-48 rounded bg-gray-200" />
              <div className="mt-3 h-4 w-64 max-w-full rounded bg-gray-200" />
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-[#dfe8df] bg-white p-5">
          <div className="h-5 w-40 rounded bg-gray-200" />
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="h-24 rounded-xl bg-gray-200" />
            <div className="h-24 rounded-xl bg-gray-200" />
            <div className="h-24 rounded-xl bg-gray-200" />
          </div>
        </div>

        <div className="mt-5 h-80 rounded-2xl border border-[#dfe8df] bg-white p-5" />
      </div>
    </main>
  );
}
