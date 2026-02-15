import { auth } from "@/auth";
import Link from "next/link";
import UserMenu from "./UserMenu";
import Logo from "./Logo";

export default async function Header() {
    const session = await auth();

    return (
        <header className="absolute top-0 left-0 w-full z-40 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="hover:opacity-80 transition-opacity">
                    {/* We can hide text logo on mobile if needed, or keep it small */}
                    <Logo className="scale-75 origin-left" />
                </Link>

                <div>
                    {session?.user ? (
                        <UserMenu user={session.user} />
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link
                                href="/login"
                                className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                            >
                                Log in
                            </Link>
                            <Link
                                href="/signup"
                                className="px-5 py-2.5 rounded-full bg-slate-900 text-white shadow-lg shadow-slate-900/20 text-sm font-semibold hover:bg-slate-800 hover:shadow-xl transition-all duration-300"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
