import { observatoryConfig } from '@/config/observatory';
import Navigation from '@/components/Navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Christian Molnar and Maple Valley Observatory - dedicated to astrophotography and astronomy from Maple Valley, Washington. Discover our equipment, techniques, and passion for capturing the cosmos.',
  keywords: [
    'Christian Molnar',
    'Maple Valley Observatory',
    'astrophotographer',
    'astronomer',
    'telescope setup',
    'Washington astronomy',
    'observatory founder'
  ],
  openGraph: {
    title: 'About Maple Valley Observatory',
    description: 'Learn about Christian Molnar and his journey in astrophotography and astronomy from Maple Valley, Washington.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <div className="pt-[148px] px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">About Maple Valley Observatory</h1>
          <div className="text-lg text-slate-300 space-y-6">
            <p>
              Welcome to Maple Valley Observatory, where passion for astronomy meets cutting-edge technology.
            </p>
            <p>
              {observatoryConfig.mission}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}