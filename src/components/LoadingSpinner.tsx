import { Sparkles, Loader2 } from 'lucide-react';

export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-700">
            <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 animate-pulse rounded-full"></div>
                <div className="relative bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50">
                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                    <div className="absolute -top-2 -right-2 bg-yellow-400 p-1.5 rounded-full animate-bounce">
                        <Sparkles className="w-3 h-3 text-white" />
                    </div>
                </div>
            </div>
            <p className="mt-6 text-slate-500 font-medium animate-pulse tracking-wide">
                Curating your perfect trip...
            </p>
        </div>
    );
}
