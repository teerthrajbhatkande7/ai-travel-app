'use client';

import { TravelData } from '@/types/travel';
import { Bed, Utensils, Bike, Star, Phone, MapPin, CheckCircle2, Clock, Coffee, Wifi, ArrowUpRight } from 'lucide-react';

export default function CityEssentials({ data }: { data: TravelData }) {
    if (!data.hotels && !data.food_spots && !data.bike_rentals) return null;

    return (
        <div className="space-y-24 py-12">

            {/* 1. HOTELS - STYLE: Luxury Keycards / Boarding Pass */}
            {data.hotels?.length > 0 && (
                <section className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="flex items-center gap-3 px-2">
                        <div className="p-3 bg-slate-900 rounded-xl text-amber-400 shadow-xl shadow-slate-900/20">
                            <Bed className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">Stay in Style</h2>
                            <p className="text-slate-500 font-medium">Curated stays for every budget</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {data.hotels.map((hotel, idx) => (
                            <div key={idx} className="group relative bg-slate-900 text-white rounded-3xl p-6 overflow-hidden hover:-translate-y-1 transition-transform duration-300 shadow-2xl shadow-slate-900/30 border border-slate-700">
                                {/* Decor */}
                                <div className="absolute top-0 right-0 p-12 opacity-5">
                                    <Bed className="w-64 h-64" />
                                </div>
                                <div className={`absolute top-0 left-0 w-2 h-full ${hotel.image_category === 'luxury' ? 'bg-amber-400' : 'bg-blue-400'}`} />

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-mono tracking-widest text-white/70">
                                            {hotel.image_category?.toUpperCase() || 'STAY'}
                                        </div>
                                        <div className="flex items-center gap-1 text-amber-400">
                                            <Star className="w-4 h-4 fill-amber-400" />
                                            <span className="font-bold">{hotel.rating}</span>
                                            <span className="text-white/40 text-xs">({hotel.reviews})</span>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold mb-1 group-hover:text-amber-400 transition-colors">{hotel.name}</h3>
                                    <p className="text-white/60 text-sm mb-6 flex items-center gap-2">
                                        <MapPin className="w-3 h-3" /> {hotel.uniqueness}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {hotel.amenities?.slice(0, 3).map((am, i) => (
                                            <span key={i} className="text-xs flex items-center gap-1 text-slate-300 bg-white/5 px-2 py-1 rounded">
                                                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {am}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/10">
                                        <div>
                                            <p className="text-xs text-white/50 uppercase tracking-wider">Price / Night</p>
                                            <p className="text-xl font-bold text-emerald-400">{hotel.price_range}</p>
                                        </div>
                                        <button className="p-3 bg-white text-slate-900 rounded-full hover:bg-amber-400 transition-colors">
                                            <ArrowUpRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* 2. FOOD - STYLE: Modern Menu / Polaroid */}
            {data.food_spots?.length > 0 && (
                <section className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                    <div className="flex items-center gap-3 px-2">
                        <div className="p-3 bg-orange-500 rounded-xl text-white shadow-xl shadow-orange-500/20">
                            <Utensils className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">Local Flavors</h2>
                            <p className="text-slate-500 font-medium">Must-try dishes & hidden gems</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.food_spots.map((food, idx) => (
                            <div key={idx} className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col relative rotate-1 hover:rotate-0">
                                {/* Pattern */}
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 via-red-500 to-amber-500" />

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${food.is_street_food ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'}`}>
                                            {food.is_street_food ? 'Street Food' : 'Restaurant'}
                                        </span>
                                        <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                                            {Array(food.rating > 4.5 ? 5 : 4).fill(0).map((_, i) => (
                                                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                                            ))}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 mb-1">{food.name}</h3>
                                    <p className="text-sm text-slate-500 italic mb-4 line-clamp-2">"{food.description}"</p>

                                    <div className="bg-orange-50 rounded-xl p-4 border border-orange-100 mb-4">
                                        <div className="flex items-center gap-2 text-orange-800 font-bold text-sm uppercase tracking-wide mb-1">
                                            <Coffee className="w-4 h-4" /> Must Try
                                        </div>
                                        <div className="text-slate-800 font-serif text-lg">{food.specialty_dish}</div>
                                    </div>

                                    <div className="flex justify-between items-center text-sm font-medium text-slate-500 mt-auto pt-4 border-t border-slate-50">
                                        <span>Cost: <span className="text-slate-900">{food.price_range}</span></span>
                                        <button className="text-orange-600 hover:text-orange-700 flex items-center gap-1">
                                            Map <ArrowUpRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* 3. BIKES - STYLE: Industrial / Digital Dashboard */}
            {data.bike_rentals?.length > 0 && (
                <section className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                    <div className="flex items-center gap-3 px-2">
                        <div className="p-3 bg-cyan-600 rounded-xl text-white shadow-xl shadow-cyan-600/20">
                            <Bike className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">Ride Your Way</h2>
                            <p className="text-slate-500 font-medium">Top rated bike rentals nearby</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {data.bike_rentals.map((rental, idx) => (
                            <div key={idx} className="group bg-slate-950 rounded-2xl p-6 relative overflow-hidden border border-slate-800 shadow-2xl hover:border-cyan-500/50 transition-colors">
                                {/* Tech Glow */}
                                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-cyan-500/20 blur-3xl rounded-full group-hover:bg-cyan-400/30 transition-colors" />

                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{rental.shop_name}</h3>
                                            <p className="text-slate-400 text-sm flex items-center gap-1">
                                                <MapPin className="w-3 h-3" /> {rental.location_tip}
                                            </p>
                                        </div>
                                        <div className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded text-sm font-bold border border-cyan-500/20 flex items-center gap-1">
                                            {rental.rating} <Star className="w-3 h-3 fill-cyan-400" />
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        {rental.vehicles?.map((vehicle, vIdx) => (
                                            <div key={vIdx} className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5 group-hover:border-white/10 transition-colors">
                                                <span className="text-slate-300 font-medium">{vehicle.name}</span>
                                                <span className="text-cyan-300 font-mono font-bold">{vehicle.price}<span className="text-xs text-slate-500 font-sans font-normal">/day</span></span>
                                            </div>
                                        ))}
                                    </div>

                                    <a
                                        href={`tel:${rental.contact_number}`}
                                        className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors uppercase tracking-wide"
                                    >
                                        <Phone className="w-4 h-4" /> Call to Book
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
