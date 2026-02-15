"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { User } from "next-auth";
import { LogOut, User as UserIcon } from "lucide-react";
import { useState } from "react";

interface UserMenuProps {
    user: User;
}

export default function UserMenu({ user }: UserMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 focus:outline-none"
            >
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 p-[2px] shadow-lg hover:shadow-cyan-500/50 transition-all duration-300">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white">
                        {user.image ? (
                            <img src={user.image} alt={user.name || "User"} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-500">
                                <UserIcon className="w-5 h-5" />
                            </div>
                        )}
                    </div>
                </div>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl shadow-2xl p-2 animate-in fade-in zoom-in-95 duration-200 origin-top-right z-50">
                    <div className="px-4 py-3 border-b border-slate-100 mb-2">
                        <p className="text-sm font-semibold text-slate-900 truncate">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>

                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
}
