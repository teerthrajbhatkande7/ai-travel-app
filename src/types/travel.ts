export interface TouristPlace {
    // 1. Basic Info
    name: string;
    overview: string;
    importance: string;
    special_features: string;
    is_unesco?: boolean;
    is_must_visit?: boolean;
    catchy_headline?: string;
    google_rating?: number;
    google_reviews?: number;

    // 2. History & Culture
    history: {
        built_in: string;
        built_by: string;
        background: string;
        cultural_importance: string;
        architectural_style: string;
    };

    // 3. Visiting Details
    visiting_details: {
        opening_hours: string;
        closing_days: string;
        entry_fee_indian: string;
        entry_fee_foreigner: string;
        parking_charges: string;
        guide_charges: string;
        time_required: string;
    };

    // 4. Best Time
    best_time: {
        season: string;
        time_of_day: string;
        weather_advice: string;
        months_to_avoid: string;
    };

    // 5 & 6. How to Reach
    reach_from_outside: {
        nearest_airport: string;
        nearest_railway: string;
        bus_routes: string;
        travel_cost_major_cities: string;
        travel_time: string;
    };
    reach_from_inside: {
        distance_from_center: string;
        metro_station: string;
        bus_numbers: string;
        auto_fare: string;
        cab_fare: string;
        local_tips: string;
    };

    // 7. Local Transport
    local_transport: {
        metro_availability: string;
        local_bus_info: string;
        auto_fare_per_km: string;
        cab_fare_per_km: string;
        bike_rental: string;
    };

    // 8. Budget
    budget: {
        low: string;
        medium: string;
        premium: string;
        approx_total: string;
    };

    // 9. Smart Tips
    smart_tips: {
        crowd_advice: string;
        safety_tips: string;
        ticket_tips: string;
        scam_alert: string;
        photography_spots: string;
        sunset_sunrise: string;
        things_to_carry: string;
    };

    // 10. Nearby Attractions
    nearby_attractions: Array<{
        name: string;
        distance: string;
        visit_order: string;
    }>;

    // 11. Nearby Food
    nearby_food: {
        local_food: string;
        street_food: string;
        budget_restaurants: string;
        premium_restaurants: string;
        meal_cost: string;
    };

    // 12. Experience
    experience: {
        inside_attractions: string;
        unique_features: string;
        activities: string;
        family_friendly: boolean;
        solo_friendly: boolean;
        couple_friendly: boolean;
    };

    // 13. Itinerary
    itinerary: {
        day_plan_1: string;
        day_plan_2: string;
        visiting_order: string;
        time_breakdown: string;
    };

    // 14. Quick Summary
    summary: {
        location: string;
        entry_fee: string;
        time_needed: string;
        best_time: string;
        budget_estimate: string;
        popularity_rating: string;
    };

    // 15. AI Enhancements
    ai_meta: {
        comparison: string;
        budget_recommendation: string;
        traveler_type: string;
        seasonal_recommendation: string;
        hidden_gems: string;
    };
}

// Phase 2: Logistics & Commercial
export interface Hotel {
    name: string;
    rating: number; // 1-5
    reviews: number;
    price_range: string; // e.g., "₹1500 - ₹2500"
    amenities: string[];
    booking_link?: string;
    image_category: 'luxury' | 'budget' | 'resort' | 'heritage'; // For selecting static gradient/icon styles
    uniqueness: string; // "Mountain view", "Heritage stay"
}

export interface FoodSpot {
    name: string;
    specialty_dish: string; // "Masala Dosa", "Seafood Thali"
    price_range: 'Cheap' | 'Moderate' | 'Expensive';
    rating: number;
    description: string; // "Famous for its buttery dosa..."
    is_street_food: boolean;
}

export interface BikeRental {
    shop_name: string;
    rating: number;
    contact_number: string;
    vehicles: Array<{ name: string; price: string }>; // "Activa: ₹400", "Royal Enfield: ₹1200"
    location_tip: string; // "Near Bus Stand"
}

// Phase 3: Engagement & Viral Features
export interface DailyItinerary {
    day_number: number;
    title: string; // "Day 1: Heritage & History"
    activities: Array<{
        time: string; // "09:00 AM"
        activity: string; // "Visit Mysore Palace"
        tip?: string; // "Get there early for tickets"
    }>;
}

export interface PackingItem {
    category: 'Essentials' | 'Clothing' | 'Gadgets' | 'Health';
    item: string;
    reason?: string; // "For the cold nights"
}

export interface TravelData {
    city_name: string; // "Mysore"
    city_overview: string;
    catchy_headline?: string;

    // Core
    tourist_places: TouristPlace[];

    // Logistics (Phase 2)
    hotels: Hotel[];
    food_spots: FoodSpot[];
    bike_rentals: BikeRental[];

    // Engagement (Phase 3)
    itinerary: DailyItinerary[];
    packing_list: PackingItem[];
    // hidden_gems is handled by filtering tourist_places with a flag if needed, 
    // or we can add a specific list. For now, let's use the core list but maybe add a 'is_hidden_gem' flag to TouristPlace later.

    local_transport: string;
    smart_tips: string;
}

export interface TravelResponse {
    data?: TravelData;
    error?: string;
}
