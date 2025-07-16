import { NextResponse } from 'next/server';
import { Region } from '@/types/database';

const fallbackRegion: Region = 'Unknown';

export async function GET() {
    try {
        const response = await fetch('https://ipapi.co/json/', {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'The Human Atlas/1.0'
            },
            // Add caching to prevent rate limiting
            next: {
                revalidate: 3600 // Cache for 1 hour
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Map the continent/region to our Region type
        const regionMap: { [key: string]: Region } = {
            'NA': 'North America',
            'SA': 'South America',
            'EU': 'Europe',
            'AF': 'Africa',
            'AS': 'Asia',
            'OC': 'Oceania',
            'ME': 'Middle East',
        };

        let detectedRegion: Region = fallbackRegion;

        if (data.continent_code && regionMap[data.continent_code]) {
            detectedRegion = regionMap[data.continent_code];
        } else if (data.country_name) {
            // Special cases for regions not directly mapped to continents
            if (['Israel', 'Saudi Arabia', 'UAE', 'Iran', 'Iraq'].includes(data.country_name)) {
                detectedRegion = 'Middle East';
            } else if (['Jamaica', 'Cuba', 'Haiti'].includes(data.country_name)) {
                detectedRegion = 'Caribbean';
            } else if (['Mexico', 'Guatemala', 'Panama'].includes(data.country_name)) {
                detectedRegion = 'Central America';
            }
        }

        return NextResponse.json({ region: detectedRegion });
    } catch (error) {
        console.error('Error detecting region:', error);
        return NextResponse.json({ region: fallbackRegion });
    }
}
