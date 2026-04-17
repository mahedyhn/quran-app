'use client';

import { useState, useEffect } from 'react';
import { Settings } from '@/lib/types';
import { getSettings, saveSettings } from '@/lib/storage';

interface SettingsSidebarProps {
    onSettingsChange: (settings: Settings) => void;
}

export default function SettingsSidebar({
    onSettingsChange,
}: SettingsSidebarProps) {
    const [settings, setSettings] = useState<Settings | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const loadedSettings = getSettings();
        setSettings(loadedSettings);
        onSettingsChange(loadedSettings);
    }, [onSettingsChange]);

    const handleFontChange = (fontFamily: string) => {
        if (!settings) return;
        const updated = { ...settings, arabicFontFamily: fontFamily };
        setSettings(updated);
        saveSettings(updated);
        onSettingsChange(updated);
    };

    const handleArabicFontSizeChange = (size: number) => {
        if (!settings) return;
        const updated = { ...settings, arabicFontSize: size };
        setSettings(updated);
        saveSettings(updated);
        onSettingsChange(updated);
    };

    const handleTranslationFontSizeChange = (size: number) => {
        if (!settings) return;
        const updated = { ...settings, translationFontSize: size };
        setSettings(updated);
        saveSettings(updated);
        onSettingsChange(updated);
    };

    if (!settings) return null;

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed right-4 top-20 z-40 bg-blue-600 text-white p-3 rounded-lg shadow-lg hover:bg-blue-700 transition"
                aria-label="Toggle settings"
            >
                ⚙️
            </button>

            <div
                className={`fixed right-0 top-0 h-screen w-80 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    } overflow-y-auto`}
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Settings</h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-600 hover:text-gray-900 text-2xl"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">
                            Arabic Font
                        </h3>
                        <div className="space-y-2">
                            {['Traditional', 'Modern'].map((font) => (
                                <label key={font} className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="arabicFont"
                                        value={font}
                                        checked={settings.arabicFontFamily === font}
                                        onChange={(e) => handleFontChange(e.target.value)}
                                        className="mr-3 w-4 h-4"
                                    />
                                    <span className="text-gray-700">{font}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">
                            Arabic Font Size
                        </h3>
                        <div className="flex items-center gap-4">
                            <input
                                type="range"
                                min="20"
                                max="48"
                                value={settings.arabicFontSize}
                                onChange={(e) =>
                                    handleArabicFontSizeChange(parseInt(e.target.value))
                                }
                                className="flex-1"
                            />
                            <span className="text-gray-700 font-semibold w-12">
                                {settings.arabicFontSize}
                            </span>
                        </div>
                        <div
                            className="mt-4 p-4 bg-gray-100 rounded text-center text-gray-700"
                            style={{ fontSize: `${settings.arabicFontSize}px` }}
                            dir="rtl"
                        >
                            الحمد لله
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">
                            Translation Font Size
                        </h3>
                        <div className="flex items-center gap-4">
                            <input
                                type="range"
                                min="12"
                                max="24"
                                value={settings.translationFontSize}
                                onChange={(e) =>
                                    handleTranslationFontSizeChange(parseInt(e.target.value))
                                }
                                className="flex-1"
                            />
                            <span className="text-gray-700 font-semibold w-12">
                                {settings.translationFontSize}
                            </span>
                        </div>
                        <div
                            className="mt-4 p-4 bg-gray-100 rounded text-center text-gray-700"
                            style={{ fontSize: `${settings.translationFontSize}px` }}
                        >
                            All praise is for Allah
                        </div>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
