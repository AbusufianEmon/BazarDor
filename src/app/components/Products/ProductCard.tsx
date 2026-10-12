import Link from "next/link";
import { Product } from "@/Types/Products";
import { UNIT_BN, toBn } from "@/Types/Format";

const BADGE: Record<string, { sign: string; color: string }> = {
    up: { sign: "▲", color: "text-red-600" },
    down: { sign: "▼", color: "text-green-600" },
};
const FLAT = { sign: "—", color: "text-gray-500" };

const ProductCard = ({ product: p }: { product: Product }) => {
    const b = BADGE[p.change.dir] ?? FLAT;

    const pct = Math.abs(p.change.pct).toLocaleString("bn-BD", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    });

    return (
        <Link
            href={`/product/${p.slug}`}
            className="flex flex-col gap-3 rounded-2xl border border-base-300 bg-base-100 p-5 transition hover:border-[#05893e] hover:shadow-md"
        >
            <div className="flex items-center gap-3">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-base-200 text-2xl">
                    {p.image}
                </div>
                <div className="min-w-0">
                    <p className="truncate text-lg font-bold leading-tight text-[#1d271f]">{p.nameBn}</p>
                    <p className="text-sm text-[#1d271f]/60">প্রতি {UNIT_BN[p.unit]}</p>
                </div>
            </div>

            <div className="flex items-end justify-between">
                <div>
                    <p className="text-sm text-[#1d271f]/60">আজকের দাম</p>
                    <p>
                        <span className="text-xl font-bold text-[#1d271f]">{toBn(p.today)}</span>{" "}
                        <span className="text-[#1d271f]">টাকা</span>
                    </p>
                </div>
                <span className={`rounded-full bg-base-200 px-3 py-1 text-sm ${b.color}`}>
                    {b.sign}
                    {p.change.dir === "flat" ? "" : " "}
                    {pct}%
                </span>
            </div>
        </Link>
    );
};

export default ProductCard;