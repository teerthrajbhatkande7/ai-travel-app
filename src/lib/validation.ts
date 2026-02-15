export function validateCity(city: string): string | null {
    if (!city || city.trim().length === 0) return "Please enter a city name.";
    if (city.length > 50) return "City name must be under 50 characters.";
    // Allow letters, spaces, hyphens, and common international characters (simplified)
    // For strict English as requested: letters, spaces, hyphens.
    if (!/^[a-zA-Z\s-]+$/.test(city)) return "City name should only contain letters, spaces, and hyphens.";
    return null;
}
