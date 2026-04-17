import { getSurahWithTranslation } from '@/lib/api';
import { Surah, AyahWithTranslation } from '@/lib/types';
import SurahClient from './page-client';

interface SurahPageProps {
  params: Promise<{ id: string }>;
}

// Generate static params for all 114 Surahs
export async function generateStaticParams() {
  const surahs = Array.from({ length: 114 }, (_, i) => ({
    id: String(i + 1),
  }));
  return surahs;
}

export default async function SurahPage({ params }: SurahPageProps) {
  const { id } = await params;
  const data = await getSurahWithTranslation(parseInt(id));

  return <SurahClient data={data} />;
}