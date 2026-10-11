import Link from "next/link";

const NavLinks = async () => {

    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories")
    const data = await res.json()

    return (
        <nav className="container mx-auto flex gap-1 overflow-x-auto px-4 py-2">
            {data.map((n: { id: string; nameBn: string; icon: string }) => (
                <Link
                    key={n.id}
                    href={`/category/${n.id}`}
                    className="flex h-8 shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-3 text-xs sm:text-sm hover:bg-base-200"
                >
                    <span>{n.icon}</span>
                    {n.nameBn}
                </Link>
            ))}
        </nav>
    );
};

export default NavLinks;