import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

const btn =
    "btn w-full gap-2 rounded border-base-300 bg-base-100 font-semibold hover:bg-base-200";

const SocialButtons = () => {

    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google",
        });
    };
    const handleGithubSignIn = async () => {
        await authClient.signIn.social({
            provider: "github",
        });
    };
    

    return (
        <>
            <div className="my-2 flex items-center gap-4">
                <div className="h-px flex-1 bg-base-300" />
                <span className="text-xs">অথবা</span>
                <div className="h-px flex-1 bg-base-300" />
            </div>

            <div className="flex flex-col gap-2">
                <button type="button" className={btn} onClick={handleGoogleSignIn}>
                    <FcGoogle size={18} />
                    Google দিয়ে চালিয়ে যান
                </button>

                <button type="button" className={btn} onClick={handleGithubSignIn}>
                    <FaGithub size={18} />
                    GitHub দিয়ে চালিয়ে যান
                </button>
            </div>
        </>
    );
};

export default SocialButtons;