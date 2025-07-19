import { createClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

type RouteContext = { params: Promise<{ username?: string | string[] }> };

export async function GET(
    request: NextRequest,
    context: RouteContext
): Promise<NextResponse> {
    const { username: rawUsername } = await context.params;
    const username = Array.isArray(rawUsername) ? rawUsername[0]! : rawUsername!;

    console.log(`GET /api/profile/${username}`);

    try {
        const { data: emotions, error } = await supabase
            .from("emotions")
            .select(
                `
        id,
        created_at,
        username,
        title,
        primary_emotion,
        description,
        day_rating,
        mood,
        region
      `
            )
            .eq("username", username);

        if (error) throw error;

        if (!emotions || emotions.length === 0) {
            return NextResponse.json({ stats: null });
        }

        console.log(`Fetched ${emotions.length} records for ${username}`);

        // Calculate stats
        const stats = {
            totalEmotions: emotions.length,
            uniqueEmotions: new Set(emotions.map((e) => e.primary_emotion))
                .size,
            mostFrequentEmotion: getMostFrequent(
                emotions.map((e) => e.primary_emotion)
            ),
            mostFrequentTime: getMostFrequentTime(
                emotions.map((e) => new Date(e.created_at))
            ),
            mostFrequentDay: getMostFrequentDay(
                emotions.map((e) => new Date(e.created_at))
            ),
            recentEmotions: emotions
                .sort(
                    (a, b) =>
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime()
                )
                .map((e) => ({
                    emotion: e.primary_emotion,
                    title: e.title,
                    description: e.description,
                    day_rating: e.day_rating,
                    mood: e.mood,
                    created_at: new Date(e.created_at).toLocaleDateString(),
                    location_name: e.region || "Unknown Location",
                })),
            emotionFrequency: emotions.reduce((acc, e) => {
                acc[e.primary_emotion] = (acc[e.primary_emotion] || 0) + 1;
                return acc;
            }, {} as { [key: string]: number }),
        };

        return NextResponse.json({ stats });
    } catch (err) {
        console.error(`Error in GET /api/profile/${username}:`, err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// Helper functions
function getMostFrequent<T>(arr: T[]): T {
    return arr
        .sort(
            (a, b) =>
                arr.filter((v) => v === a).length -
                arr.filter((v) => v === b).length
        )
        .pop()!;
}

function getMostFrequentTime(dates: Date[]): string {
    const hours = dates.map((d) => d.getHours());
    const mostFrequentHour = getMostFrequent(hours);
    return new Date(0, 0, 0, mostFrequentHour).toLocaleTimeString([], {
        hour: "numeric",
    });
}

function getMostFrequentDay(dates: Date[]): string {
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const dayIndices = dates.map((d) => d.getDay());
    const mostFrequentDay = getMostFrequent(dayIndices);
    return days[mostFrequentDay];
}
