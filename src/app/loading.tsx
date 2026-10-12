const CardSkeleton = () => (
  <div className="flex h-[138px] flex-col justify-between rounded-2xl border border-base-300 bg-base-100 p-5">
    <div className="flex items-center gap-3">
      <div className="size-12 rounded-xl bg-base-200" />
      <div className="flex flex-col gap-2">
        <div className="h-4 w-28 rounded bg-base-200" />
        <div className="h-3 w-16 rounded bg-base-200" />
      </div>
    </div>
    <div className="flex items-end justify-between">
      <div className="flex flex-col gap-2">
        <div className="h-3 w-16 rounded bg-base-200" />
        <div className="h-5 w-24 rounded bg-base-200" />
      </div>
      <div className="h-7 w-16 rounded-full bg-base-200" />
    </div>
  </div>
);

const SectionSkeleton = ({ cards }: { cards: number }) => (
  <section className="container mx-auto px-4 py-4">
    <div className="h-6 w-44 rounded bg-base-200" />
    <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: cards }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  </section>
);

export default function Loading() {
  return (
    <div className="animate-pulse" aria-busy="true" aria-label="লোড হচ্ছে">
      {/* hero */}
      <div className="mx-auto max-w-6xl px-4 pt-6">
        <div className="flex flex-col gap-8 rounded-3xl border border-base-300 bg-base-100 px-4 py-8 md:flex-row md:items-center md:justify-between md:py-10">
          <div className="flex max-w-xl flex-1 flex-col gap-3">
            <div className="h-7 w-48 rounded-full bg-base-200" />
            <div className="h-10 w-full max-w-md rounded bg-base-200" />
            <div className="h-4 w-full rounded bg-base-200" />
            <div className="h-4 w-3/4 rounded bg-base-200" />
            <div className="mt-2 h-10 w-32 rounded-lg bg-base-200" />
          </div>
          <div className="mx-auto h-[220px] w-full max-w-[315px] rounded-2xl bg-base-200 md:mx-0" />
        </div>
      </div>

      <SectionSkeleton cards={6} />
      <SectionSkeleton cards={6} />
      <SectionSkeleton cards={9} />
    </div>
  );
}