import React from 'react';
import ResourcePageTemplate from '@/components/ResourcePageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Astronomy & Astrophotography Resources',
  description: 'Curated guides, communities, and tools to help you explore the universe and capture its beauty through astrophotography.',
  keywords: [
    'astronomy guides',
    'astrophotography tutorials',
    'telescope guides',
    'astronomy communities',
    'star photography',
    'deep sky imaging',
    'astronomy tools'
  ],
  openGraph: {
    title: 'Astronomy & Astrophotography Resources - Maple Valley Observatory',
    description: 'Curated resources for astronomy and astrophotography enthusiasts.',
    type: 'website',
  },
};

const resources = [
  {
    category: 'Guides',
    items: [
      {
        name: "Beginner's Guide to Astrophotography",
        link: 'https://astrobackyard.com/beginners-guide-to-astrophotography/',
        description: 'A comprehensive introduction to astrophotography for beginners.'
      },
      {
        name: 'Astronomy Tools',
        link: 'https://astronomy.tools/',
        description: 'Online calculators and tools for planning your night sky sessions.'
      }
    ]
  },
  {
    category: 'Communities',
    items: [
      {
        name: 'Cloudy Nights Forum',
        link: 'https://www.cloudynights.com/',
        description: 'Active community for astronomy and astrophotography discussions.'
      },
      {
        name: 'r/Astronomy',
        link: 'https://www.reddit.com/r/astronomy/',
        description: "Reddit's hub for astronomy enthusiasts."
      }
    ]
  }
];

export default function AstronomyAstrophotographyPage() {
  return (
    <ResourcePageTemplate
      title="Astronomy & Astrophotography Resources"
      backgroundImage="/images/astrophotography/deep-sky/nebulas/North America and The Pelican.jpg"
      description="Curated guides, communities, and tools to help you explore the universe and capture its beauty."
      resources={resources}
    />
  );
}