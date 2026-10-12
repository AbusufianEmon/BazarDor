import Link from "next/link";
import { notFound } from "next/navigation";
import { Product } from "@/Types/Products";
import { toBn, UNIT_BN } from "@/Types/Format";

const API = "https://openapi.programming-hero.com/api/bazardor";


const fmt = (n: number) =>
  Number.isInteger(n)
    ? toBn(n)
    : n.toLocaleString("bn-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

async function getProduct(slug: string): Promise<Product | null> {
  const res = await fetch(`${API}/products?slug=${encodeURIComponent(slug)}`);
  if (!res.ok) return null;
  const list: Product[] = await res.json();
  return list.find((p) => p.slug === slug) ?? null; 
}

const Stat = ({ label, value, color, note }: { label: string; value: number; color: string; note: string }) => (
  <div className="rounded-2xl border border-base-300 bg-base-100 px-6 py-4">
    <p className="text-xs text-[#1d271f]">{label}</p>
    <p style={{ color }}>
      <span className="text-2xl font-bold leading-8">{toBn(value)}</span>
      <span className="text-sm font-medium"> টাকা</span>
    </p>
    <p className="text-xs text-[#1d271f]">{note}</p>
  </div>
);

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) notFound();

  const rows = p.markets
    .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.avg - b.avg);

  const minPrice = Math.min(...p.markets.map((m) => m.min));
  const maxPrice = Math.max(...p.markets.map((m) => m.max));
  const avgPrice = Math.round(rows.reduce((s, r) => s + r.avg, 0) / rows.length);

  const diff = p.today - p.yesterday;
  const dirWord = p.change.dir === "up" ? "বেড়েছে" : p.change.dir === "down" ? "কমেছে" : "অপরিবর্তিত";
  const dirColor = p.change.dir === "up" ? "text-[#d03739]" : p.change.dir === "down" ? "text-[#1a9951]" : "text-gray-500";
  const dirSign = p.change.dir === "up" ? "▲" : p.change.dir === "down" ? "▼" : "—";
  const unit = UNIT_BN[p.unit];

  return (
    <div className="container mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 text-[#1d271f]">
      <nav className="flex items-center gap-3 pl-1 text-sm">
        <Link href="/" className="hover:underline">হোম</Link>
        <span>›</span>
        <Link href={`/category/${p.category}`} className="hover:underline">{p.categoryNameBn}</Link>
        <span>›</span>
        <span>{p.nameBn}</span>
      </nav>

      <section className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-5 md:flex-row md:items-center">
        <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-4xl">
          {p.image}
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold leading-9 md:text-3xl">{p.nameBn}</h1>
          <p className="text-sm">
            প্রতি {unit} ·{" "}
            <Link
              href={`/category/${p.category}`}
              className="rounded-full bg-base-200 px-2 py-0.5 hover:bg-base-300"
            >
              {p.categoryIcon} {p.categoryNameBn}
            </Link>
          </p>
          <p className="mt-2 text-sm">
            গতকালের তুলনায় আজ দাম <span className="font-semibold">{dirWord}</span>
            {diff !== 0 && ` · ${toBn(Math.abs(diff))} টাকা`}
          </p>
        </div>

        <div className="flex flex-col items-center rounded-2xl bg-base-200 px-5 pb-4 pt-4 text-center md:w-29.5">
          <p className="text-sm">আজকের দাম</p>
          <p className="text-3xl font-bold leading-9">{toBn(p.today)}</p>
          <p className="text-sm">টাকা / {unit}</p>
          <p className={`mt-1 flex items-center gap-1 text-sm font-semibold ${dirColor}`}>
            <span>{dirSign}</span>
            <span>{toBn(Math.abs(p.change.pct))}%</span>
          </p>
        </div>
      </section>


      <section className="flex flex-col gap-6 rounded-2xl border border-base-300 bg-base-100 p-5">
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <Stat label="সর্বনিম্ন দাম" value={minPrice} color="#1a9951" note="সবচেয়ে কম দামের বাজার" />
            <Stat label="সর্বাধিক দাম" value={maxPrice} color="#d03739" note="সবচেয়ে বেশি দামের বাজার" />
            <Stat label="গড় দাম" value={avgPrice} color="#05893e" note={`প্রতি ${unit}-এর হিসাবে`} />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">বাজারভিত্তিক আজকের দাম</h2>
          <div className="overflow-x-auto rounded-2xl border border-base-300 bg-base-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1d271f] text-left font-bold">
                  <th className="px-4 py-3">বাজার</th>
                  <th className="px-4 py-3">বিভাগ</th>
                  <th className="px-4 py-3 text-right">সর্বনিম্ন</th>
                  <th className="px-4 py-3 text-right">সর্বাধিক</th>
                  <th className="px-4 py-3 text-right">গড়</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((m) => (
                  <tr key={m.market} className="border-b border-[#1d271f] last:border-b-0 even:bg-base-200">
                    <td className="px-4 py-3 font-medium">{m.market}</td>
                    <td className="px-4 py-3">{m.division}</td>
                    <td className="px-4 py-3 text-right">{toBn(m.min)} টাকা</td>
                    <td className="px-4 py-3 text-right">{toBn(m.max)} টাকা</td>
                    <td className="px-4 py-3 text-right font-semibold">{fmt(m.avg)} টাকা</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}