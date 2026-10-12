"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Category = { id: string; nameBn: string; icon: string };

const NavLinkList = ({ categories }: { categories: Category[] }) => {
    const pathname = usePathname();

    return (
        <nav className="container mx-auto flex gap-1 overflow-x-auto px-4 py-2">
            {categories.map((n) => {
                const href = `/category/${n.id}`;
                const active = pathname === href;

                return (
                    <Link
                        key={n.id}
                        href={href}
                        className={`flex h-8 shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-3 text-xs sm:text-sm ${
                            active ? "bg-green-600 text-white" : "hover:bg-base-200"
                        }`}
                    >
                        <span>{n.icon}</span>
                        {n.nameBn}
                    </Link>
                );
            })}
        </nav>
    );
};

export default NavLinkList;