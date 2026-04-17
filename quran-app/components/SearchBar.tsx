'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { searchAyahs } from '@/lib/api';

interface SearchResult {
    surah: number;
    ayah: number;
    text: string;
    translation: string;
}

interface SearchBarProps {
    onSearch: (results: SearchResult[]) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    const handleSearch = useCallback(
        async (searchQuery: string) => {
            if (searchQuery.trim().length < 3) {
                onSearch([]);
                return;
            }

            setLoading(true);
            try {
                const results = await searchAyahs(searchQuery);

                // Handle different response structures from API
                const formatted = results.map((result: any) => {
                    // Extract surah number and ayah number from different possible structures
                    const surah = result.surah?.number || result.surah || 1;
                    const ayah = result.numberInSurah || result.ayah || result.number || 0;
                    const text = result.text || '';
                    const translation = result.translation || '';

                    return { surah, ayah, text, translation };
                });

                onSearch(formatted);
            } catch (error) {
                console.error('Search error:', error);
                onSearch([]);
            } finally {
                setLoading(false);
            }
        },
        [onSearch]
    );

    useEffect(() => {
        // Clear previous timer
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        // Set new timer for debounced search
        debounceTimer.current = setTimeout(() => {
            handleSearch(query);
        }, 500); // 500ms delay

        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, [query, handleSearch]);

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search for ayahs... (min 3 characters)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {loading && (
                    <div className="absolute right-3 top-3">
                        <div className="animate-spin text-blue-600">⟳</div>
                    </div>
                )}
            </div>
        </div>
    );
}
