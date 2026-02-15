import { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';

interface CityInputProps {
    onSearch: (city: string) => void;
    isLoading: boolean;
}

export default function CityInput({ onSearch, isLoading }: CityInputProps) {
    const [city, setCity] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto relative z-20">
            <div className="relative group transform transition-all duration-300 hover:scale-[1.01]">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                <div className="relative flex items-center bg-white rounded-full p-2 shadow-xl">
                    <div className="pl-4 text-slate-400">
                        <Search className="w-6 h-6 group-focus-within:text-violet-600 transition-colors" />
                    </div>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Where do you want to go? (e.g., Paris, Tokyo)..."
                        className="w-full bg-transparent p-4 text-lg text-slate-800 placeholder:text-slate-400 focus:outline-none"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !city.trim()}
                        className="bg-slate-900 text-white px-8 py-3 rounded-full font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2 shadow-lg shadow-slate-900/20"
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Processing
                            </span>
                        ) : (
                            <>
                                <span>Guide Me</span>
                                <Sparkles className="w-4 h-4 text-yellow-300" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
}
