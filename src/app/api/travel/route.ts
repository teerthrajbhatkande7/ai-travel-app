import { NextResponse } from 'next/server';
import { validateCity } from '@/lib/validation';
import { checkRateLimit } from '@/lib/rateLimit';
import { getCachedData, setCachedData } from '@/lib/cache';
import { model } from '@/lib/gemini';
import { TravelData } from '@/types/travel';

export const maxDuration = 60; // Allow up to 60 seconds for AI processing

export async function POST(req: Request) {
  try {
    // 1. IP Rate Limiting
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // 2. Input Validation
    const rawBody = await req.text();
    console.log("Raw Request Body:", rawBody);
    let body;
    try {
      body = JSON.parse(rawBody);
    } catch (e) {
      console.error("Request Body Parse Error:", e);
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }
    const { city } = body;
    const validationError = validateCity(city);

    if (validationError) {
      return NextResponse.json(
        { error: validationError },
        { status: 400 }
      );
    }

    // 3. Cache Check
    const cacheKey = city.toLowerCase().trim();
    const cachedResult = getCachedData(cacheKey);
    if (cachedResult) {
      return NextResponse.json({ data: cachedResult });
    }

    // 4. AI Generation
    if (!model) {
      return NextResponse.json(
        { error: 'Gemini API not configured' },
        { status: 500 }
      );
    }

    const prompt = `Generate a comprehensive travel guide for "${city}".
    Return a strictly valid JSON object with the following structure:
    {
      "city_name": "${city}",
      "city_overview": "A brief and engaging overview of the city.",
      "tourist_places": [
        {
          "name": "Place name",
          "catchy_headline": "A short, punchy, attention-grabbing title (e.g., 'The Niagara of India', 'City of Palaces')",
          "overview": "Short overview (2-3 lines)",
          "importance": "Why it is important",
          "special_features": "What makes it special",
          "is_unesco": true, // or false
          "is_must_visit": true, // Mark TRUE for the top 3-4 absolutely unmissable places
          "google_rating": 4.5, // Realistic rating between 3.5 and 4.9
          "google_reviews": 1250, // Realistic review count
          "history": {
            "built_in": "When it was built",
            "built_by": "Who built it",
            "background": "Storytelling style: Fascinating legends, myths, or royal secrets. Make it a story people want to read.",
            "cultural_importance": "Cultural importance",
            "architectural_style": "Architectural uniqueness"
          },
          "visiting_details": {
            "opening_hours": "Opening hours",
            "closing_days": "Closing days",
            "entry_fee_indian": "Entry ticket price (Indian)",
            "entry_fee_foreigner": "Entry ticket price (Foreigners)",
            "parking_charges": "Parking charges",
            "guide_charges": "Guide charges",
            "time_required": "Time required to explore"
          },
          "best_time": {
            "season": "Best season (e.g., October-February)",
            "time_of_day": "Best time of day",
            "weather_advice": "Weather advice",
            "months_to_avoid": "Months to avoid"
          },
          "reach_from_outside": {
            "nearest_airport": "Nearest airport (distance + approx taxi fare)",
            "nearest_railway": "Nearest railway station (distance + fare range)",
            "bus_routes": "Major bus routes",
            "travel_cost_major_cities": "Approx travel cost from major cities",
            "travel_time": "Approx travel time"
          },
          "reach_from_inside": {
            "distance_from_center": "Distance from city center",
            "metro_station": "Metro station name",
            "bus_numbers": "Bus numbers",
            "auto_fare": "Auto fare range",
            "cab_fare": "Cab fare range",
            "local_tips": "Local transport tips"
          },
          "local_transport": {
            "metro_availability": "Metro availability",
            "local_bus_info": "Local bus info",
            "auto_fare_per_km": "Auto fare per km",
            "cab_fare_per_km": "Cab fare per km",
            "bike_rental": "Bike rental availability"
          },
          "budget": {
            "low": "Low budget estimate",
            "medium": "Medium budget estimate",
            "premium": "Premium budget estimate",
            "approx_total": "Approx total cost for one visit"
          },
          "smart_tips": {
            "crowd_advice": "Crowd advice",
            "safety_tips": "Safety tips",
            "ticket_tips": "Ticket counter tips",
            "scam_alert": "Avoid scams",
            "photography_spots": "Best photography spots",
            "sunset_sunrise": "Sunset/sunrise value",
            "things_to_carry": "Things to carry"
          },
          "nearby_attractions": [
            { "name": "Name", "distance": "Distance", "visit_order": "suggested order" }
          ],
          "nearby_food": {
            "local_food": "Popular local food",
            "street_food": "Street food options",
            "budget_restaurants": "Budget restaurants",
            "premium_restaurants": "Premium restaurants",
            "meal_cost": "Approx meal cost"
          },
          "experience": {
            "inside_attractions": "What you will see inside",
            "unique_features": "Unique features",
            "activities": "Activities available",
            "family_friendly": true,
            "solo_friendly": true,
            "couple_friendly": true
          },
          "itinerary": {
            "day_plan_1": "1-day plan",
            "day_plan_2": "2-day plan",
            "visiting_order": "Suggested visiting order",
            "time_breakdown": "Morning/afternoon/evening breakdown"
          },
          "summary": {
            "location": "Location",
            "entry_fee": "Entry fee summary",
            "time_needed": "Time needed",
            "best_time": "Best time",
            "budget_estimate": "Budget estimate",
            "popularity_rating": "Rating/popularity"
          },
          "ai_meta": {
            "comparison": "Compare with similar places",
            "budget_recommendation": "Recommend based on budget",
            "traveler_type": "Suggest based on traveler type",
            "seasonal_recommendation": "Seasonal recommendations",
            "hidden_gems": "Hidden gems nearby"
          }
        }
      ],
      "local_transport": "Overview of city transport.",
      "smart_tips": "Practical tips for travelers (safety, food, culture, etc.)",
      "hotels": [
        {
          "name": "Hotel Name",
          "rating": 4.5,
          "reviews": 1200,
          "price_range": "₹1500 - ₹2500",
          "amenities": ["WiFi", "Pool", "Breakfast"],
          "image_category": "luxury", // or 'budget', 'resort', 'heritage'
          "uniqueness": "Why stay here? (e.g. 'View of the falls')"
        }
      ],
      "food_spots": [
        {
          "name": "Restaurant/Stall Name",
          "specialty_dish": "Must Try Dish",
          "price_range": "Moderate", // Cheap/Moderate/Expensive
          "rating": 4.7,
          "description": "Short mouth-watering description",
          "is_street_food": false // true if street stall
        }
      ],
      "bike_rentals": [
        {
          "shop_name": "Rental Shop Name",
          "rating": 4.2,
          "contact_number": "+91 98xxx...",
          "vehicles": [{ "name": "Scooter", "price": "₹400" }, { "name": "Bullet", "price": "₹1000" }],
          "location_tip": "Where is it?"
        }
      ]
    }
    Ensure the tone is engaging but STRICTLY FACTUAL. Use real-world data.
    CRITICAL INSTRUCTION: provide 100% Accurate Locations and Names.
    - "google_rating" MUST be realistic (e.g., 4.2 to 4.8).
    - "opening_hours" and "entry_fee" must be as accurate as possible.
    - Do NOT invent places. Only list real, existing tourist spots.
    
    Provide a COMPREHENSIVE list of the top 10 to 12 tourist places. 
    Select 3-4 "Must Visit" places and set "is_must_visit": true for them.
    For "history.background", tell a STORY but keep it historically grounded.
    
    PHASE 2 INSTRUCTIONS:
    - Hotels: Provide 4 diverse options (1 Heritage/Luxury, 1 Resort/View, 2 Budget/Clean).
    - Food: Provide 5 spots (Mix of famous street food and iconic restaurants).
    - Bike Rentals: Provide 2-3 reliable real or generic rental shop names with realistic prices for that city.
    
    Fill ALL fields with specific, realistic data. Do not leave fields empty.
    PERFORMANCE NOTE: Keep descriptions high-quality but CONCISE to ensure fast generation. Avoid unnecessary fluff.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up potential markdown code blocks if Gemini adds them
    let cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

    // Fix potential bad escapes (e.g. \ at end of line or invalid escapes)
    // This is a simple heuristic: remove backslashes that aren't part of standard JSON escapes
    cleanedText = cleanedText.replace(/\\(?!["\\/bfnrtu])/g, "");

    let travelData: TravelData;
    try {
      travelData = JSON.parse(cleanedText);
    } catch (e) {
      console.error("JSON Parse Error:", e);
      console.error("Raw Text:", text);
      console.error("Cleaned Text:", cleanedText);
      return NextResponse.json(
        { error: 'Failed to parse travel data from AI. Please try again.' },
        { status: 500 }
      );
    }

    // 5. Update Cache
    setCachedData(cacheKey, travelData);

    return NextResponse.json({ data: travelData });

  } catch (error: any) {
    console.error('API Error:', error);

    // Check for Google API Quota Exceeded (429)
    // Check for Google API Quota Exceeded (429)
    if (error.status === 429 || error.message?.includes('429')) {
      console.warn("Quota exceeded. Returning fallback data.");

      // Fallback Data (Mock for "Goa" style content)
      const fallbackData: TravelData = {
        city_name: "Goa",
        city_overview: "Limit Reached? No worries! Here is a demo for 'Goa'. Goa is India's pocket-sized paradise, famous for its sun-kissed beaches, Portuguese heritage, and vibrant nightlife.",
        catchy_headline: "The Party Capital",
        tourist_places: [
          {
            name: "Calangute Beach",
            catchy_headline: "Queen of Beaches",
            overview: " The largest and most popular beach in North Goa.",
            importance: "Hub of water sports and nightlife.",
            special_features: "Golden sands, shacks, and water scooters.",
            is_must_visit: true,
            google_rating: 4.6,
            google_reviews: 15400,
            history: {
              built_in: "N/A",
              built_by: "Nature",
              background: "Legend says hippies discovered this paradise in the 60s.",
              cultural_importance: "Symbol of Goa's tourism.",
              architectural_style: "Natural"
            },
            visiting_details: {
              opening_hours: "24 Hours", closing_days: "None", entry_fee_indian: "Free", entry_fee_foreigner: "Free",
              parking_charges: "₹50", guide_charges: "N/A", time_required: "3-4 Hours"
            },
            best_time: { season: "Nov-Feb", time_of_day: "Sunset", weather_advice: "Sunny", months_to_avoid: "June-Aug" },
            reach_from_outside: { nearest_airport: "Dabolim (40km)", nearest_railway: "Thivim (20km)", bus_routes: "Mapusa to Calangute", travel_cost_major_cities: "₹1000-5000", travel_time: "1 Hour" },
            reach_from_inside: { distance_from_center: "15km", metro_station: "N/A", bus_numbers: "Local Bus", auto_fare: "₹300-500", cab_fare: "₹800-1200", local_tips: "Rent a scooter." },
            local_transport: { metro_availability: "No", local_bus_info: "Available", auto_fare_per_km: "₹20", cab_fare_per_km: "₹25", bike_rental: "Plenty" },
            budget: { low: "₹500", medium: "₹1500", premium: "₹5000", approx_total: "₹2000" },
            smart_tips: { crowd_advice: "Crowded in evenings", safety_tips: "Swim in safe zones", ticket_tips: "N/A", scam_alert: "Taxi overcharge", photography_spots: "Sunset point", sunset_sunrise: "Sunset", things_to_carry: "Sunscreen" },
            nearby_attractions: [{ name: "Baga Beach", distance: "2km", visit_order: "Next" }],
            nearby_food: { local_food: "Goan Curry", street_food: "Ros Omelette", budget_restaurants: "Fat Fish", premium_restaurants: "Brittos", meal_cost: "₹500" },
            experience: { inside_attractions: "Sea", unique_features: "Shacks", activities: "Parasailing", family_friendly: true, solo_friendly: true, couple_friendly: true },
            itinerary: { day_plan_1: "Beach day", day_plan_2: "Party night", visiting_order: "Calangute -> Baga", time_breakdown: "Morning Swim" },
            summary: { location: "North Goa", entry_fee: "Free", time_needed: "4 hours", best_time: "Winter", budget_estimate: "Medium", popularity_rating: "High" },
            ai_meta: { comparison: "Like Miami", budget_recommendation: "Mid-range", traveler_type: "All", seasonal_recommendation: "Winter", hidden_gems: "None" }
          }
        ],
        local_transport: "Scooters are the best way to travel around Goa (₹300-500/day). Taxis can be expensive.",
        smart_tips: "1. Rent a bike immediately. 2. Wear sunscreen. 3. Try the Vindaloo.",
        hotels: [
          { name: "Taj Fort Aguada", rating: 4.8, reviews: 5000, price_range: "₹15000+", amenities: ["Pool", "Sea View", "Spa"], image_category: "luxury", uniqueness: "Historic Fort Stay" },
          { name: "Zostel Goa", rating: 4.5, reviews: 2000, price_range: "₹800-1500", amenities: ["WiFi", "Dorm"], image_category: "budget", uniqueness: "Traveler Community" }
        ],
        food_spots: [
          { name: "Infantaria", specialty_dish: "Beef Burger", price_range: "Moderate", rating: 4.4, description: "Iconic breakfast spot.", is_street_food: false },
          { name: "Noronha's Corner", specialty_dish: "Chicken Cafreal", price_range: "Cheap", rating: 4.8, description: "Best food truck in Anjuna.", is_street_food: true }
        ],
        bike_rentals: [
          { shop_name: "MK Bike Rental", rating: 4.3, contact_number: "+91 9822...", vehicles: [{ name: "Activa", price: "₹350" }], location_tip: "Near Calangute Circle" }
        ]
      };

      return NextResponse.json({ data: fallbackData });
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
