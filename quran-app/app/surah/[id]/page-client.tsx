'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Surah, AyahWithTranslation, Settings } from '@/lib/types';
import { getSettings } from '@/lib/storage';
import SettingsSidebar from '@/components/SettingsSidebar';

interface SurahClientProps {
    data: {
        surah: Surah;
        ayahs: AyahWithTranslation[];
    } | null;
}

export default function SurahClient({ data }: SurahClientProps) {
    const [settings, setSettings] = useState<Settings | null>(null);

    useEffect(() => {
        const loadedSettings = getSettings();
        setSettings(loadedSettings);
    }, []);

    if (!data) {
        return <div className="text-center mt-10">Surah not found</div>;
    }

    const { surah, ayahs } = data;
    const arabicSize = settings?.arabicFontSize || 32;
    const translationSize = settings?.translationFontSize || 16;

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <SettingsSidebar onSettingsChange={setSettings} />
            <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <Link href="/" className="text-blue-100 hover:text-white mb-4 inline-block">
                        Back to Surahs
                    </Link>
                    <h1 className="text-4xl font-bold mb-2">{surah.englishName}</h1>
                    <p className="text-2xl font-arabic mb-2" dir="rtl">
                        {surah.name}
                    </p>
                    <p className="text-blue-100">{surah.englishNameTranslation}</p>
                </div>
            </header>
            <main className="max-w-4xl mx-auto px-4 py-12">
                {ayahs.map((ayah) => (
                    <div
                        key={ayah.number}
                        className="bg-white p-8 rounded-lg shadow-md mb-8 border-l-4 border-blue-500"
                    >
                        <div className="mb-6 p-4 bg-blue-50 rounded" dir="rtl" style={{ fontSize: arabicSize }}>
                            <p className="text-gray-800">{ayah.text}</p>
                        </div>
                        <div className="flex justify-between mb-4 pb-4 border-b border-gray-200">
                            <span className="bg-blue-600 text-white px-3 py-1 rounded font-bold">
                                {ayah.numberInSurah}
                            </span>
                            <span className="text-gray-600">Page {ayah.page}</span>
                        </div>
                        <div style={{ fontSize: translationSize }} className="text-gray-700 leading-relaxed">
                            <p>{ayah.translation}</p>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
}
