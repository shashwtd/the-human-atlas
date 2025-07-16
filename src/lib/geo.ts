import { Region } from '@/types/database';

const fallbackRegion: Region = 'Unknown';

export async function getUserRegion(): Promise<Region> {
    try {
        const response = await fetch('/api/region');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.region || fallbackRegion;
    } catch (error) {
        console.error('Error fetching user region:', error);
        return fallbackRegion;
    }
}
