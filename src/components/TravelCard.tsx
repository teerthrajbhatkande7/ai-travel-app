'use client';

import { useState } from 'react';
import { TouristPlace } from '@/types/travel';
import { Calendar, MapPin, History, ArrowRight, X, Navigation } from 'lucide-react';

interface TravelCardProps {
    place: TouristPlace;
}

export default function TravelCard({ place }: TravelCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="group relative bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="p-6 pb-0 relative">
                    <div className="flex justify-between items-start mb-4">
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-violet-100 text-violet-600 rounded-xl hover:bg-violet-600 hover:text-white transition-colors duration-300 cursor-pointer"
                            title="View on Google Maps"
                        >
                            <MapPin className="w-6 h-6" />
                        </a>
                        <div className="flex gap-2">
                            {place.is_unesco && (
                                <span className="bg-amber-100 text-amber-700 text-xs px-3 py-1 rounded-full font-medium tracking-wide flex items-center gap-1">
                                    <span>🏛️</span> UNESCO
                                </span>
                            )}
                            <span className="bg-slate-900 text-white text-xs px-3 py-1 rounded-full font-medium tracking-wide">
                                MUST VISIT
                            </span>
                        </div>
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
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full py-2.5 rounded-xl bg-slate-50 text-slate-600 text-sm font-medium hover:bg-violet-50 hover:text-violet-700 transition-colors flex items-center justify-center gap-2 group/btn"
                        >
                            Read More
                            <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    />

                    <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-6 text-white relative">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <h2 className="text-2xl font-bold pr-8">{place.name}</h2>
                            <div className="flex items-center gap-2 mt-2 text-violet-100 text-sm">
                                <Calendar className="w-4 h-4" />
                                <span>Best time to visit: {place.best_time}</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6">
                            <section>
                                <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900 mb-3">
                                    <MapPin className="w-5 h-5 text-violet-600" />
                                    Why it's important
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {place.importance}
                                </p>
                            </section>

                            <section>
                                <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900 mb-3">
                                    <History className="w-5 h-5 text-amber-500" />
                                    History & Culture
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {place.history}
                                </p>
                            </section>

                            <section className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900 mb-3">
                                    <Navigation className="w-5 h-5 text-emerald-600" />
                                    How to Reach
                                </h3>
                                <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                                    {place.how_to_reach}
                                </p>
                            </section>
                        </div>

                        <div className="p-6 pt-0 border-t border-slate-100 mt-6 bg-slate-50/50">
                            <div className="pt-4 flex justify-end">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
