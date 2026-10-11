import React from "react";
import { Product } from "@/Types/Products";
import ProductCard from "./ProductCard";

type Props = {
  title: React.ReactNode;
  subtitle?: string;
  products: Product[];
  id?: string;
};

const ProductSection = ({ title, subtitle, products, id }: Props) => {
  return (
    <section id={id} className="container mx-auto scroll-mt-40 px-4 py-4">
      <h2 className="text-xl font-bold text-[#1d271f]">{title}</h2>
      {subtitle && <p className="text-sm text-[#1d271f]/60">{subtitle}</p>}

      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;