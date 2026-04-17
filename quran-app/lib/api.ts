import { Surah, Ayah, AyahWithTranslation } from './types';

const API_BASE = 'https://api.alquran.cloud/v1';

export async function getSurahs(): Promise<Surah[]> {
    try {
        const response = await fetch(`${API_BASE}/surah`);
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Failed to fetch surahs:', error);
        return [];
    }
}

export async function getSurah(id: number): Promise<Surah | null> {
    try {
        const response = await fetch(`${API_BASE}/surah/${id}`);
        const data = await response.json();
        return data.data || null;
    } catch (error) {
        console.error('Failed to fetch surah:', error);
        return null;
    }
}

export async function getSurahAyahs(surahId: number): Promise<Ayah[]> {
    try {
        const response = await fetch(`${API_BASE}/surah/${surahId}`);
        const data = await response.json();
        return data.data?.ayahs || [];
    } catch (error) {
        console.error('Failed to fetch ayahs:', error);
        return [];
    }
}

export async function getSurahWithTranslation(surahId: number): Promise<{
    surah: Surah;
    ayahs: AyahWithTranslation[];
} | null> {
    try {
        const [arabicResponse, translationResponse] = await Promise.all([
            fetch(`${API_BASE}/surah/${surahId}`),
            fetch(`${API_BASE}/surah/${surahId}/en.asad`),
        ]);

        const arabicData = await arabicResponse.json();
        const translationData = await translationResponse.json();

        if (!arabicData.data || !translationData.data) {
            return null;
        }

        const surah = arabicData.data;
        const ayahs: AyahWithTranslation[] = (surah.ayahs || []).map(
            (ayah: Ayah, index: number) => ({
                ...ayah,
                translation:
                    (translationData.data.ayahs &&
                        translationData.data.ayahs[index]?.text) ||
                    '',
            })
        );

        return { surah, ayahs };
    } catch (error) {
        console.error('Failed to fetch surah with translation:', error);
        return null;
    }
}

export async function searchAyahs(query: string, limit = 20): Promise<any[]> {
    try {
        const response = await fetch(`${API_BASE}/search?query=${encodeURIComponent(query)}&limit=${limit}`);
        const data = await response.json();

        // Handle different response structures from the API
        if (data.data && Array.isArray(data.data)) {
            return data.data;
        }
        if (data.data?.matches && Array.isArray(data.data.matches)) {
            return data.data.matches;
        }
        if (data.data?.results && Array.isArray(data.data.results)) {
            return data.data.results;
        }

        console.log('Search response:', data);
        return [];
    } catch (error) {
        console.error('Failed to search ayahs:', error);
        return [];
    }
}
