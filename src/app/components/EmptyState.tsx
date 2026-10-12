import Link from "next/link";

const EmptyState = ({ title, message }: { title: string; message: string }) => (
  <div className="container mx-auto flex flex-col items-center gap-4 px-4 py-24 text-center text-[#1d271f]">
    <p className="text-6xl">🛒</p>
    <h1 className="text-2xl font-bold">{title}</h1>
    <p className="text-[#1d271f]/70">{message}</p>
    <Link
      href="/"
      className="rounded-xl bg-[#05893e] px-5 py-2 font-medium text-[#f3fbf4] hover:opacity-90"
    >
      হোম পেজে ফিরে যান
    </Link>
  </div>
);

export default EmptyState;