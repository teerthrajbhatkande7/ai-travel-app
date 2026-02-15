import { TouristPlace } from '@/types/travel';
import { Calendar, MapPin, History, ArrowRight } from 'lucide-react';

interface TravelCardProps {
    place: TouristPlace;
}

export default function TravelCard({ place }: TravelCardProps) {
    return (
        <div className="group relative bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="p-6 pb-0 relative">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-violet-100 text-violet-600 rounded-xl group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
                        <MapPin className="w-6 h-6" />
                    </div>
                    <span className="bg-slate-900 text-white text-xs px-3 py-1 rounded-full font-medium tracking-wide">
                        MUST VISIT
                    </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-violet-700 transition-colors">
                    {place.name}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {place.importance}
                </p>
            </div>

            <div className="mt-auto p-6 pt-0 space-y-3 relative">
                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent w-full my-4" />

                <div className="flex items-center gap-3 text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                    <History className="w-4 h-4 text-amber-500" />
                    <span className="truncate">{place.history.substring(0, 40)}...</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                    <Calendar className="w-4 h-4 text-emerald-500" />
                    <span className="font-medium text-emerald-700">{place.best_time}</span>
                </div>

                <div className="pt-4">
                    <button className="w-full py-2.5 rounded-xl bg-slate-50 text-slate-600 text-sm font-medium hover:bg-violet-50 hover:text-violet-700 transition-colors flex items-center justify-center gap-2 group/btn">
                        Read More
                        <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}
