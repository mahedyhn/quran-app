'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSurahs } from '@/lib/api';
import { Surah, Settings } from '@/lib/types';
import SettingsSidebar from '@/components/SettingsSidebar';
import SearchBar from '@/components/SearchBar';

interface SearchResult {
  surah: number;
  ayah: number;
  text: string;
  translation: string;
}

export default function Home() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    const loadSurahs = async () => {
      setLoading(true);
      const data = await getSurahs();
      setSurahs(data);
      setLoading(false);
    };
    loadSurahs();
  }, []);

  const handleSearch = (results: SearchResult[]) => {
    setSearchResults(results);
    setShowSearchResults(results.length > 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SettingsSidebar onSettingsChange={setSettings} />

      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-2">Quran Web App</h1>
          <p className="text-blue-100">Read, Search, and Learn the Holy Quran</p>
        </div>
      </header>

      <section className="bg-white shadow-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {showSearchResults && searchResults.length > 0 ? (
          <div>
            <h2 className="text-3xl font-bold mb-8">Search Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {searchResults.map((result, idx) => (
                <Link
                  key={idx}
                  href={`/surah/${result.surah}`}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-blue-500"
                >
                  <p className="text-sm text-gray-600 mb-2">
                    Surah {result.surah}, Ayah {result.ayah}
                  </p>
                  <p className="text-gray-800 line-clamp-2">{result.translation}</p>
                </Link>
              ))}
            </div>
            <button
              onClick={() => setShowSearchResults(false)}
              className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Back to Surahs
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-bold mb-8">All 114 Surahs</h2>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin text-4xl">⟳</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {surahs.map((surah) => (
                  <Link
                    key={surah.number}
                    href={`/surah/${surah.number}`}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer border-t-4 border-blue-500 group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-sm text-gray-600">Surah {surah.number}</p>
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition">
                          {surah.englishName}
                        </h3>
                      </div>
                      <span className="text-2xl text-blue-600 font-bold">{surah.number}</span>
                    </div>
                    <p className="text-xl font-arabic mb-3" dir="rtl">
                      {surah.name}
                    </p>
                    <p className="text-sm text-gray-600">{surah.englishNameTranslation}</p>
                    <p className="text-xs text-gray-500 mt-3">
                      {surah.numberOfAyahs} verses • {surah.revelationType}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
