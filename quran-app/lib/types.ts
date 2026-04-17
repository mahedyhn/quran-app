export interface Ayah {
    number: number;
    text: string;
    numberInSurah: number;
    juz: number;
    manzil: number;
    page: number;
    ruku: number;
    hizbQuarter: number;
    sajdah: boolean;
}

export interface AyahWithTranslation extends Ayah {
    translation: string;
}

export interface Surah {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
}

export interface Settings {
    arabicFontFamily: string;
    arabicFontSize: number;
    translationFontSize: number;
}

export const DEFAULT_SETTINGS: Settings = {
    arabicFontFamily: 'Traditional',
    arabicFontSize: 32,
    translationFontSize: 16,
};
