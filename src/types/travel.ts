export interface TouristPlace {
    name: string;
    importance: string;
    history: string;
    best_time: string;
    how_to_reach: string;
}

export interface TravelData {
    city_overview: string;
    tourist_places: TouristPlace[];
    local_transport: string;
    smart_tips: string;
}

export interface TravelResponse {
    data?: TravelData;
    error?: string;
}
