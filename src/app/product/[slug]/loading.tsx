export default function Loading() {
  return (
    <div
      className="mx-auto flex max-w-6xl animate-pulse flex-col gap-6 px-4 py-6"
      aria-busy="true"
      aria-label="লোড হচ্ছে"
    >
      
      <div className="flex items-center gap-3 pl-1">
        <div className="h-4 w-10 rounded bg-base-200" />
        <div className="h-4 w-14 rounded bg-base-200" />
        <div className="h-4 w-28 rounded bg-base-200" />
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-5 md:flex-row md:items-center">
        <div className="size-20 shrink-0 rounded-2xl bg-base-200" />
        <div className="flex flex-1 flex-col gap-2">
          <div className="h-8 w-56 rounded bg-base-200" />
          <div className="h-4 w-40 rounded bg-base-200" />
          <div className="h-4 w-64 rounded bg-base-200" />
        </div>
        <div className="h-29 rounded-2xl bg-base-200 md:w-29.5" />
      </div>

      <div className="flex flex-col gap-6 rounded-2xl border border-base-300 bg-base-100 p-5">
        <div className="flex flex-col gap-3">
          <div className="h-6 w-36 rounded bg-base-200" />
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-25.5 rounded-2xl border border-base-300 bg-base-200" />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="h-6 w-48 rounded bg-base-200" />
          <div className="overflow-hidden rounded-2xl border border-base-300">
            <div className="h-11 border-b border-base-300 bg-base-200" />
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`h-11.5 border-b border-base-300 last:border-b-0 ${i % 2 === 1 ? "bg-base-200" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}