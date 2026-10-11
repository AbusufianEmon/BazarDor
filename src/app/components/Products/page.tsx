import React from "react";
import { Product } from "@/Types/Products";
import { toBn } from "@/Types/Format";
import ProductSection from "./ProductSection";

const ProductPage = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
  const data: Product[] = res.ok ? await res.json() : [];

  const risers = data
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = data
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct) // pct is negative, so most negative first
    .slice(0, 6);

  return (
    <div>
      <ProductSection
        title={<><span className="text-xs text-red-600">▲</span> আজ দাম বেড়েছে</>}
        products={risers}
      />
      <ProductSection
        title={<><span className="text-xs text-green-600">▼</span> আজ দাম কমেছে</>}
        products={fallers}
      />
      <ProductSection
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle={`মোট ${toBn(data.length)}টি পণ্য দেখানো হচ্ছে`}
        products={data}
      />
    </div>
  );
};

export default ProductPage;