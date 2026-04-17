import { Settings, DEFAULT_SETTINGS } from './types';

const SETTINGS_KEY = 'quran-settings';

export function getSettings(): Settings {
    if (typeof window === 'undefined') {
        return DEFAULT_SETTINGS;
    }

    try {
        const saved = localStorage.getItem(SETTINGS_KEY);
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (error) {
        console.error('Failed to load settings:', error);
    }

    return DEFAULT_SETTINGS;
}

export function saveSettings(settings: Settings): void {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
        console.error('Failed to save settings:', error);
    }
}
