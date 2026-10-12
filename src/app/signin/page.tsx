"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Errors = {
    email?: string;
    password?: string;
};

const SignInPage = () => {
    const router = useRouter();
    const [errors, setErrors] = useState<Errors>({});

    const onSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const { email, password } = Object.fromEntries(formData.entries()) as {
            email: string;
            password: string;
        };

        const newErrors: Errors = {};
        if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "সঠিক ইমেইল ঠিকানা দিন।";
        if (!password) newErrors.password = "পাসওয়ার্ড লিখুন।";

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            toast.error(Object.values(newErrors)[0], { id: "form-error" });
            return;
        }

        const { data, error } = await authClient.signIn.email({
            email,
            password,
            callbackURL: "/",
        });

        if (error) {
            toast.error(
                error.code === "INVALID_EMAIL_OR_PASSWORD"
                    ? "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়। আবার চেষ্টা করুন।"
                    : error.message || "কিছু একটা সমস্যা হয়েছে",
                { id: "auth-error" }
            );
            return;
        }
        if (data) {
            toast.success("সফলভাবে সাইন ইন হয়েছে");
            router.push("/");
            router.refresh();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center bg-base-200 py-10">

            <div className="flex flex-col items-center gap-1 text-center">
                <h1 className="text-2xl font-bold">সাইন ইন</h1>
                <p className="text-sm mb-2">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
            </div>

            <form onSubmit={onSubmit} noValidate className="w-full max-w-sm">
                <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full border p-6">

                    <label className="label">ইমেইল</label>
                    <input name="email" type="email" className={`input w-full ${errors.email ? "input-error" : ""}`} placeholder="you@example.com" />
                    {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}

                    <label className="label">পাসওয়ার্ড</label>
                    <input name="password" type="password" className={`input w-full ${errors.password ? "input-error" : ""}`} placeholder="কমপক্ষে ৮ অক্ষর" />
                    {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}

                    <button type="submit" className="btn rounded bg-green-600 mt-4 text-white">সাইন ইন</button>
                </fieldset>
            </form>

        </div>
    );
};

export default SignInPage;