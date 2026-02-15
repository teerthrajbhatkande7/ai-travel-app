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
        const body = await req.json();
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
      "city_overview": "A brief and engaging overview of the city.",
      "tourist_places": [
        {
          "name": "Name of the place",
          "importance": "Why it's famous",
          "history": "Brief history",
          "best_time": "Best time to visit",
          "how_to_reach": "How to get there"
        }
      ],
      "local_transport": "Details about local public transport options.",
      "smart_tips": "Practical tips for travelers (safety, food, culture, etc.)"
    }
    Ensure the tone is friendly and practical. Provide at least 4-5 tourist places.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up potential markdown code blocks if Gemini adds them
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        let travelData: TravelData;
        try {
            travelData = JSON.parse(cleanedText);
        } catch (e) {
            console.error("JSON Parse Error:", e);
            return NextResponse.json(
                { error: 'Failed to parse travel data from AI.' },
                { status: 500 }
            );
        }

        // 5. Update Cache
        setCachedData(cacheKey, travelData);

        return NextResponse.json({ data: travelData });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
