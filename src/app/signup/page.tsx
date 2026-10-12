"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import SocialButtons from "@/app/components/SocialButtons";

type Errors = {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
};

const SignUpPage = () => {
    const router = useRouter();
    const [errors, setErrors] = useState<Errors>({});
    const [formError, setFormError] = useState("");

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormError("");
        const formData = new FormData(event.currentTarget);
        const { name, email, password, confirmPassword } = Object.fromEntries(
            formData.entries()
        ) as { name: string; email: string; password: string; confirmPassword: string };

        const newErrors: Errors = {};
        if (!name.trim()) newErrors.name = "নাম লিখুন।";
        if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "সঠিক ইমেইল ঠিকানা দিন।";
        if (password.length < 8) newErrors.password = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
        if (password !== confirmPassword) newErrors.confirmPassword = "দুটি পাসওয়ার্ড মিলছে না।";

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            toast.error("ফর্মের তথ্য ঠিক করে আবার চেষ্টা করুন।", { id: "form-error" });
            return;
        }
        const { data, error } = await authClient.signUp.email({
            name,
            email,
            password,
            callbackURL: "/",
        });

        if (error) {
            if (error.code?.startsWith("USER_ALREADY_EXISTS")) {
                const msg = "এই ইমেইল দিয়ে আগে থেকেই একটি অ্যাকাউন্ট আছে। সাইন ইন করে নিন।";
                setFormError(msg);
                toast.error(msg, { id: "auth-error" });
            } else if (error.message) {
                toast.error(error.message, { id: "auth-error" });
            }
            return;
        }
        if (data) {
            toast.success("অ্যাকাউন্ট তৈরি হয়েছে");
            router.push("/");
            router.refresh();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center bg-base-200 py-10">

            <div className="flex flex-col items-center gap-1 text-center">
                <h1 className="text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
                <p className="text-sm mb-2">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
            </div>

            <form onSubmit={onSubmit} noValidate className="w-full max-w-sm">
                <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full border p-6">

                    {formError && (
                        <div className="flex items-center gap-3 rounded-2xl bg-red-600 p-4 text-white mb-2">
                            <span>⚠️</span>
                            <p>{formError}</p>
                        </div>
                    )}

                    <label className="label">নাম</label>
                    <input name="name" type="text" className={`input w-full ${errors.name ? "input-error" : ""}`} placeholder="যেমন: রহিম উদ্দিন" />
                    {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}

                    <label className="label">ইমেইল</label>
                    <input name="email" type="email" className={`input w-full ${errors.email ? "input-error" : ""}`} placeholder="you@example.com" />
                    {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}

                    <label className="label">পাসওয়ার্ড</label>
                    <input name="password" type="password" className={`input w-full ${errors.password ? "input-error" : ""}`} placeholder="কমপক্ষে ৮ অক্ষর" />
                    {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}

                    <label className="label">পাসওয়ার্ড নিশ্চিত করুন</label>
                    <input name="confirmPassword" type="password" className={`input w-full ${errors.confirmPassword ? "input-error" : ""}`} placeholder="আবার লিখুন" />
                    {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}

                    <button type="submit" className="btn rounded bg-green-600 mt-4 text-white">অ্যাকাউন্ট তৈরি করুন</button>
                    <SocialButtons />

                    <p className="mt-2 text-center text-sm">
                        অ্যাকাউন্ট আছে?{" "}
                        <Link href="/signin" className="font-medium text-green-600 hover:underline">
                            সাইন ইন করুন
                        </Link>
                    </p>
                </fieldset>
            </form>
            <Link href="/" className="mt-6 text-sm hover:underline">
                ← হোম পেজে ফিরে যান
            </Link>

        </div>
    );
};

export default SignUpPage;