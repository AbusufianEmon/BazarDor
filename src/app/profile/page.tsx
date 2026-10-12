"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const ProfilePage = () => {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const handleSignOut = async () => {
        await authClient.signOut();
        router.push("/");
        router.refresh();
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const name = String(new FormData(e.currentTarget).get("name") ?? "").trim();
        if (!name) return toast.error("নাম লিখুন।");

        const { error } = await authClient.updateUser({ name });
        if (error) return toast.error(error.message ?? "");

        toast.success("প্রোফাইল আপডেট হয়েছে");
        router.refresh();
    };

    if (!user) return null;

    return (
        <div className="mx-auto w-full max-w-3xl px-4 py-10">
            <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
            <p className="text-sm text-gray-600 mb-6">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

            <div className="flex items-center justify-between rounded-2xl border border-base-300 bg-base-100 p-6">
                <div>
                    <p className="text-lg font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <button onClick={handleSignOut} className="btn btn-sm btn-outline text-red-600 border-red-500">
                    ↩ সাইন আউট
                </button>
            </div>

            <form onSubmit={handleUpdate} className="mt-6 rounded-2xl border border-base-300 bg-base-100 p-6">
                <h2 className="text-lg font-semibold mb-4">তথ্য</h2>
                <label className="label">নাম</label>
                <input name="name" defaultValue={user.name} className="input w-full" />
                <button type="submit" className="btn w-full rounded bg-green-600 mt-3 text-white">আপডেট</button>
            </form>
        </div>
    );
};

export default ProfilePage;