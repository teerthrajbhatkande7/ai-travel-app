'use client';

import { useState } from 'react';
import { TouristPlace } from '@/types/travel';
import { Calendar, MapPin, History, ArrowRight, X, Navigation, Star } from 'lucide-react';

interface TravelCardProps {
    place: TouristPlace;
    city?: string;
}

export default function TravelCard({ place, city }: TravelCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Deterministic color generation based on place name
    const getGradient = (name: string) => {
        const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const gradients = [
            'from-violet-500 to-fuchsia-500',
            'from-cyan-500 to-blue-500',
            'from-emerald-400 to-teal-600',
            'from-amber-400 to-orange-600',
            'from-rose-400 to-pink-600',
            'from-indigo-400 to-purple-600',
            'from-lime-400 to-green-600'
        ];
        return gradients[hash % gradients.length];
    };

    const gradientClass = getGradient(place.name);
    // Ensure we have a valid city name for the map query to avoid wrong locations
    const mapQuery = `${place.name} ${city || ''}`;

    return (
        <>
            <div className={`group relative bg-white/60 backdrop-blur-md rounded-2xl border ${place.is_must_visit ? 'border-amber-400 shadow-amber-100/50 shadow-lg' : 'border-white/50 shadow-sm'} hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full hover:-translate-y-1`}>
                <div className={`h-48 w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br ${gradientClass} transition-all duration-500`}>
                    {/* Decorative Background Pattern */}
                    <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-1/2 -translate-y-1/2 rotate-12 transition-transform duration-700 group-hover:rotate-45">
                        <Navigation className="w-48 h-48 text-white mix-blend-overlay" />
                    </div>

                    {/* Centered Icon & Text */}
                    <div className="flex flex-col items-center justify-center text-white/90 group-hover:text-white transition-colors duration-300 z-10 w-3/4 text-center">
                        <MapPin className="w-10 h-10 mb-2 drop-shadow-md opacity-80" strokeWidth={1.5} />

                        {/* Catchy Headline (The "Hook") */}
                        {place.catchy_headline && (
                            <span className="text-sm font-medium text-amber-300 uppercase tracking-widest mb-1 drop-shadow-sm font-serif italic">
                                {place.catchy_headline}
                            </span>
                        )}

                        <span className="text-2xl font-black tracking-wider uppercase drop-shadow-md line-clamp-2 leading-none">
                            {place.name}
                        </span>
                    </div>

                    {/* Shimmer Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="p-6 pb-0 relative">
                    <div className="flex justify-between items-start mb-4">
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-violet-100 text-violet-600 rounded-xl hover:bg-violet-600 hover:text-white transition-colors duration-300 cursor-pointer z-10 shadow-sm"
                            title="View on Google Maps"
                        >
                            <MapPin className="w-6 h-6" />
                        </a>
                        <div className="flex gap-2">
                            {place.is_unesco && (
                                <span className="bg-amber-100 text-amber-700 text-xs px-3 py-1 rounded-full font-medium tracking-wide flex items-center gap-1 shadow-sm border border-amber-200">
                                    <span>🏛️</span> UNESCO
                                </span>
                            )}
                            {place.is_must_visit && (
                                <span className="bg-slate-900 text-white text-xs px-3 py-1 rounded-full font-medium tracking-wide shadow-sm shadow-slate-500/30 animate-pulse border border-slate-700">
                                    👑 MUST VISIT
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-violet-700 transition-colors">
                            {place.name}
                        </h3>
                        {place.google_rating && (
                            <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-lg border border-slate-100 shadow-sm shrink-0">
                                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                <span className="text-xs font-bold text-slate-700">{place.google_rating}</span>
                            </div>
                        )}
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {place.importance}
                    </p>
                </div>

                <div className="mt-auto p-6 pt-0 space-y-3 relative">
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent w-full my-4" />

                    <div className="flex items-start gap-3 text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                        <History className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span className="truncate line-clamp-2 italic">"{place.history?.background?.substring(0, 80)}..."</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                        <Calendar className="w-4 h-4 text-emerald-500" />
                        <span className="font-medium text-emerald-700">{place.best_time?.season}</span>
                    </div>

                    <div className="pt-4">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className={`w-full py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 group/btn ${place.is_must_visit ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-slate-50 text-slate-600 hover:bg-violet-50 hover:text-violet-700'}`}
                        >
                            {place.is_must_visit ? 'Explore Top Pick' : 'Read More'}
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

                    <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[90vh] flex flex-col">

                        {/* Header with Static Gradient */}
                        <div className={`relative shrink-0 h-48 bg-gradient-to-r ${place.is_must_visit ? 'from-amber-500 to-orange-600' : 'from-violet-600 to-indigo-600'} p-8 overflow-hidden`}>
                            {/* Decorative Background */}
                            <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                                <Navigation className="w-64 h-64 text-white" />
                            </div>

                            <div className="relative z-10 text-white h-full flex flex-col justify-end">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="absolute top-[-1rem] right-[-1rem] p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-md"
                                >
                                    <X className="w-6 h-6 text-white" />
                                </button>

                                <div className="flex items-center gap-3 mb-2">
                                    <h2 className="text-3xl font-bold drop-shadow-md">{place.name}</h2>
                                    {place.is_must_visit && (
                                        <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/20 uppercase tracking-widest">
                                            Cannot Miss
                                        </span>
                                    )}
                                </div>
                                <p className="text-white/90 text-sm drop-shadow-md line-clamp-2 max-w-2xl italic">
                                    {place.history?.background}
                                </p>
                            </div>
                        </div>

                        {/* Badges Bar */}
                        <div className="bg-slate-50 border-b border-slate-100 px-6 py-3 flex flex-wrap gap-3">
                            {place.is_unesco && (
                                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm border border-amber-200">
                                    <span>🏛️</span> UNESCO Site
                                </span>
                            )}
                            <span className="bg-white text-slate-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 border border-slate-200 shadow-sm">
                                <Calendar className="w-3 h-3" /> {place.best_time?.season}
                            </span>
                            <span className="bg-white text-slate-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 border border-slate-200 shadow-sm">
                                ⏱️ {place.visiting_details?.time_required}
                            </span>
                            <span className="bg-white text-slate-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 border border-slate-200 shadow-sm">
                                💰 {place.budget?.approx_total}
                            </span>
                            {place.google_rating && (
                                <span className="bg-white text-slate-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 border border-slate-200 shadow-sm">
                                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                    {place.google_rating} <span className="text-slate-400">({place.google_reviews ? (place.google_reviews > 1000 ? (place.google_reviews / 1000).toFixed(1) + 'k' : place.google_reviews) : 'N/A'})</span>
                                </span>
                            )}
                        </div>

                        {/* Scrollable Content */}
                        <div className="overflow-y-auto p-6 space-y-8 custom-scrollbar bg-slate-50/50">

                            {/* 1. Quick Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <section className={`bg-white p-4 rounded-xl border ${place.is_must_visit ? 'border-amber-200 shadow-amber-50' : 'border-slate-100'} shadow-sm hover:shadow-md transition-shadow`}>
                                    <h3 className="font-semibold text-amber-700 mb-2 flex items-center gap-2">
                                        <History className="w-4 h-4" /> Legend & Story
                                    </h3>
                                    <p className="text-sm text-slate-600 italic">"{place.history?.background?.substring(0, 100)}..."</p>
                                    <div className="mt-2 text-xs text-slate-500 pt-2 border-t border-slate-50">
                                        <strong>Built:</strong> {place.history?.built_in} by {place.history?.built_by}
                                    </div>
                                </section>

                                <section className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                    <h3 className="font-semibold text-emerald-900 mb-2 flex items-center gap-2">
                                        <Navigation className="w-4 h-4" /> Visiting
                                    </h3>
                                    <ul className="text-sm text-slate-600 space-y-1">
                                        <li>🕒 {place.visiting_details?.opening_hours}</li>
                                        <li>🎟️ ₹{place.visiting_details?.entry_fee_indian} (Ind)</li>
                                        <li>🎟️ {place.visiting_details?.entry_fee_foreigner} (Foreign)</li>
                                    </ul>
                                </section>

                                <section className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                    <h3 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                                        💡 Smart Tips
                                    </h3>
                                    <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
                                        <li>{place.smart_tips?.crowd_advice}</li>
                                        <li>{place.smart_tips?.photography_spots}</li>
                                    </ul>
                                </section>
                            </div>

                            {/* 2. Detailed Sections */}
                            <div className="space-y-6">
                                <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                    <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        🏰 History & Culture
                                    </h3>
                                    <div className="prose prose-slate max-w-none text-slate-600">
                                        <p>{place.history?.background}</p>
                                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                                            <div className="bg-slate-50 p-3 rounded-lg">
                                                <strong>Architectural Style:</strong> {place.history?.architectural_style}
                                            </div>
                                            <div className="bg-slate-50 p-3 rounded-lg">
                                                <strong>Cultural Importance:</strong> {place.history?.cultural_importance}
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                    <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        🚌 How to Reach
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="bg-slate-50 p-4 rounded-xl">
                                            <h4 className="font-semibold text-slate-800 mb-3 border-b border-slate-200 pb-2">From Outside City</h4>
                                            <ul className="space-y-3 text-sm text-slate-600">
                                                <li className="flex gap-2"><span className="text-lg">✈️</span> <div><strong>Airport:</strong> {place.reach_from_outside?.nearest_airport}</div></li>
                                                <li className="flex gap-2"><span className="text-lg">🚆</span> <div><strong>Railway:</strong> {place.reach_from_outside?.nearest_railway}</div></li>
                                                <li className="flex gap-2"><span className="text-lg">🚌</span> <div><strong>Bus:</strong> {place.reach_from_outside?.bus_routes}</div></li>
                                            </ul>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-xl">
                                            <h4 className="font-semibold text-slate-800 mb-3 border-b border-slate-200 pb-2">Local Commute</h4>
                                            <ul className="space-y-3 text-sm text-slate-600">
                                                <li className="flex gap-2"><span className="text-lg">🚇</span> <div><strong>Metro:</strong> {place.reach_from_inside?.metro_station}</div></li>
                                                <li className="flex gap-2"><span className="text-lg">🚕</span> <div><strong>Cab/Auto:</strong> {place.reach_from_inside?.auto_fare} / {place.reach_from_inside?.cab_fare}</div></li>
                                                <li className="flex gap-2"><span className="text-lg">💡</span> <div><strong>Tip:</strong> {place.reach_from_inside?.local_tips}</div></li>
                                            </ul>
                                        </div>
                                    </div>
                                </section>

                                <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                    <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        📅 Itinerary & Experience
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="font-semibold text-slate-800 mb-2">Activities</h4>
                                            <p className="text-sm text-slate-600 mb-4 bg-slate-50 p-3 rounded-lg">{place.experience?.activities}</p>

                                            <h4 className="font-semibold text-slate-800 mb-2">Suggested Plan</h4>
                                            <div className="bg-violet-50 p-4 rounded-lg text-sm text-slate-700 border-l-4 border-violet-500">
                                                {place.itinerary?.day_plan_1}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-800 mb-2">Nearby Attractions</h4>
                                            <div className="space-y-2 bg-slate-50 p-3 rounded-lg mb-4">
                                                {place.nearby_attractions?.map((attr, idx) => (
                                                    <div key={idx} className="flex justify-between text-sm border-b border-slate-200 last:border-0 pb-2 last:pb-0">
                                                        <span className="font-medium text-slate-700">{attr.name}</span>
                                                        <span className="text-slate-500 text-xs bg-white px-2 py-0.5 rounded-full border border-slate-200">{attr.distance}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <h4 className="font-semibold text-slate-800 mb-2">Food Recommendations</h4>
                                            <div className="text-sm text-slate-600 bg-orange-50 p-3 rounded-lg border border-orange-100">
                                                <div className="mb-2"><strong>Must Try:</strong> {place.nearby_food?.local_food}</div>
                                                <div><strong>Street Food:</strong> {place.nearby_food?.street_food}</div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-slate-100 bg-white shrink-0 flex justify-between items-center z-10">
                            <div className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                                AI Comparison: {place.ai_meta?.comparison}
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-6 py-2 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl transform active:scale-95 duration-200"
                            >
                                Close Guide
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
