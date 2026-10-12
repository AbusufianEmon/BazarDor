import { notFound } from "next/navigation";
import { Product } from "@/Types/Products";
import { toBn } from "@/Types/Format";
import EmptyState from "@/app/components/EmptyState";
import CategoryProducts from "@/app/components/CategoryProducts";

const API = "https://openapi.programming-hero.com/api/bazardor";

type Category = { id: string; slug: string; nameBn: string; icon: string };

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = encodeURIComponent(slug);

  const [catRes, prodRes] = await Promise.all([
    fetch(`${API}/categories/${s}`),
    fetch(`${API}/products?category=${s}`),
  ]);

  if (!catRes.ok) notFound();
  const category: Category = await catRes.json();
  if (!category?.nameBn) notFound(); // invalid slug

  const products: Product[] = prodRes.ok ? await prodRes.json() : [];

  if (products.length === 0) {
    return <EmptyState title="কোনো পণ্য পাওয়া যায়নি" message={`${category.nameBn} ক্যাটাগরিতে এখন কোনো পণ্য নেই।`} />;
  }

  return (
    <div className="container mx-auto flex flex-col gap-6 px-4 py-6 text-[#1d271f]">
      <section className="flex items-center gap-4 rounded-2xl border border-base-300 bg-base-100 p-5">
        <span className="text-4xl">{category.icon}</span>
        <div>
          <h1 className="text-2xl font-bold">{category.nameBn}</h1>
          <p className="text-sm text-[#1d271f]/70">
            {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </section>

      <CategoryProducts products={products} />
    </div>
  );
}