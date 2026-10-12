export default function Loading() {
  return (
    <div className="container mx-auto flex animate-pulse flex-col gap-6 px-4 py-6">
      <div className="h-24 rounded-2xl border border-base-300 bg-base-200" />
      <div className="h-6 w-48 rounded bg-base-200" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-[138px] rounded-2xl border border-base-300 bg-base-200" />
        ))}
      </div>
    </div>
  );
}