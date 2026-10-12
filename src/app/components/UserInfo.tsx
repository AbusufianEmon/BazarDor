"use client";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const UserInfo = () => {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const handleSignOut = async () => {
        await authClient.signOut();
        toast.success("সাইন আউট হয়েছে");
        router.push("/");
        router.refresh();
    };

    if (!user) {
        return (
            <div className="flex gap-4 items-center">
                <Link href="/signin" className="btn-sm sm:btn-md hover:cursor-pointer">
                    সাইন ইন
                </Link>
                <Link href="/signup" className="btn btn-success bg-green-600 btn-sm sm:btn-md text-white rounded-lg md:px-5">
                    সাইন আপ
                </Link>
            </div>
        );
    }

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="flex items-center gap-2 cursor-pointer">
                {user.image ? (
                    <Image src={user.image} alt={user.name} className="h-7 w-7 rounded-full object-cover" width={28} height={28} />
                ) : (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-600 text-xs font-semibold text-white">
                        {user.name?.charAt(0).toUpperCase()}
                    </div>
                )}
                <span className="text-sm">{user.name?.split(" ")[0]}</span>
                <span className="text-[8px] text-gray-500">▼</span>
            </div>

            <div tabIndex={0} className="dropdown-content z-50 mt-3 w-56 rounded-xl border border-base-300 bg-base-100 p-4 shadow-lg">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500 break-all">{user.email}</p>

                <div className="mt-4 flex flex-col gap-2 text-sm">
                    <Link href="/profile">👤 আমার প্রোফাইল</Link>
                    <button onClick={handleSignOut} className="text-left text-red-600 cursor-pointer">
                        ↩ সাইন আউট
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;