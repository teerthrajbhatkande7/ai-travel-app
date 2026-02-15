import { signIn } from "@/auth";
import Logo from "@/components/Logo";
import { Github } from "lucide-react";

interface AuthCardProps {
    mode: "login" | "signup";
}

export default function AuthCard({ mode }: AuthCardProps) {
    const isLogin = mode === "login";
    const title = isLogin ? "Welcome Back" : "Create an Account";
    const description = isLogin
        ? "Sign in to save your trips and preferences."
        : "Join RoamEasy to start your AI travel journey.";
    const googleText = isLogin ? "Continue with Google" : "Sign up with Google";
    const githubText = isLogin ? "Continue with GitHub" : "Sign up with GitHub";
    const footerText = isLogin
        ? "Don't have an account? "
        : "Already have an account? ";
    const footerLinkText = isLogin ? "Sign up" : "Log in";
    const footerLinkHref = isLogin ? "/signup" : "/login";

    return (
        <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/60 shadow-2xl rounded-3xl p-8 space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="text-center space-y-2">
                <div className="flex justify-center mb-6">
                    <Logo className="scale-110" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
                <p className="text-slate-500">{description}</p>
            </div>

            <div className="space-y-4">
                <form
                    action={async () => {
                        "use server";
                        await signIn("google", { redirectTo: "/" });
                    }}
                >
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md group"
                    >
                        <img src="https://authjs.dev/img/providers/google.svg" alt="Google" className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>{googleText}</span>
                    </button>
                </form>

                <form
                    action={async () => {
                        "use server";
                        await signIn("github", { redirectTo: "/" });
                    }}
                >
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-3 bg-[#24292F] hover:bg-[#24292F]/90 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md group"
                    >
                        <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>{githubText}</span>
                    </button>
                </form>
            </div>

            <div className="text-center space-y-4">
                <p className="text-sm text-slate-500">
                    {footerText}
                    <a href={footerLinkHref} className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                        {footerLinkText}
                    </a>
                </p>
                <p className="text-xs text-slate-400">
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
    );
}
