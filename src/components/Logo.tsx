import { Compass, Sparkles } from 'lucide-react';

export default function Logo({ className = "" }: { className?: string }) {
    return (
        <div className={`flex items-center gap-2 group cursor-default ${className}`}>
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-xl p-2 shadow-sm border border-white/50">
                    <Compass className="w-8 h-8 text-blue-600 transform group-hover:rotate-45 transition-transform duration-500 ease-in-out" />
                    <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-400 animate-pulse" />
                </div>
            </div>
            <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 group-hover:from-blue-600 group-hover:to-cyan-600 transition-all duration-300">
                    RoamEasy
                </span>
                <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase leading-none pl-[1px]">
                    Travel AI
                </span>
            </div>
        </div>
    );
}
