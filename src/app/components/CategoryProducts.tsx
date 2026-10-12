"use client";

import { useState } from "react";
import { Product } from "@/Types/Products";
import { toBn } from "@/Types/Format";
import ProductCard from "./Products/ProductCard";

type Sort = "default" | "asc" | "desc";

export default function CategoryProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<Sort>("default");

  const sorted =
    sort === "default"
      ? products
      : [...products].sort((a, b) => (sort === "asc" ? a.today - b.today : b.today - a.today));

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-end gap-2 text-sm">
        <label htmlFor="sort">সাজান</label>
        <div className="relative">
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="appearance-none rounded-lg border border-base-300 bg-base-100 py-1.5 pl-3 pr-8"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs">▾</span>
        </div>
      </div>

      <p className="text-sm text-[#1d271f]/70">মোট {toBn(sorted.length)}টি পণ্য দেখানো হচ্ছে</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}