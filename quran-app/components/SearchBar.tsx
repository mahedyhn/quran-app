'use client';

import { useState, useCallback } from 'react';
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

    const handleSearch = useCallback(
        async (searchQuery: string) => {
            if (searchQuery.trim().length < 3) {
                onSearch([]);
                return;
            }

            setLoading(true);
            try {
                const results = await searchAyahs(searchQuery);
                const formatted = results.map((result: any) => ({
                    surah: result.surah.number,
                    ayah: result.numberInSurah,
                    text: result.text || '',
                    translation: result.translation || '',
                }));
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

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search for ayahs..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        handleSearch(e.target.value);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {loading && (
                    <div className="absolute right-3 top-3">
                        <div className="animate-spin">⟳</div>
                    </div>
                )}
            </div>
        </div>
    );
}
