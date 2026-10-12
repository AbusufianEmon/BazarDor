import NavLinkList from "./NavLinkList";

const NavLinks = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories")
    const data = res.ok ? await res.json() : []

    return <NavLinkList categories={Array.isArray(data) ? data : []} />;
};

export default NavLinks;