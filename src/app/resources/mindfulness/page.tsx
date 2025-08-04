import React from 'react';
import ResourcePageTemplate from '@/components/ResourcePageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mindfulness Resources',
  description: 'Discover curated mindfulness, meditation, and wellbeing resources to help you find balance and peace in your life.',
  keywords: [
    'mindfulness',
    'meditation',
    'wellbeing',
    'mental health',
    'stress relief',
    'meditation apps',
    'mindful living'
  ],
  openGraph: {
    title: 'Mindfulness Resources - Maple Valley Observatory',
    description: 'Curated resources for mindfulness, meditation, and wellbeing.',
    type: 'website',
  },
};

const resources = [
  {
    category: 'Meditation',
    items: [
      {
        name: 'Headspace',
        link: 'https://www.headspace.com/',
        description: 'Guided meditation and mindfulness app for all levels.'
      },
      {
        name: 'Insight Timer',
        link: 'https://insighttimer.com/',
        description: 'Free meditation app with thousands of guided sessions.'
      }
    ]
  },
  {
    category: 'Wellbeing',
    items: [
      {
        name: 'Mindful.org',
        link: 'https://www.mindful.org/',
        description: 'Articles and resources for living a mindful life.'
      },
      {
        name: 'Calm',
        link: 'https://www.calm.com/',
        description: 'App for sleep, meditation, and relaxation.'
      }
    ]
  }
];

export default function MindfulnessPage() {
  return (
    <ResourcePageTemplate
      title="Mindfulness Resources"
      backgroundImage="/images/astrophotography/deep-sky/nebulas/North America and The Pelican.jpg"
      description="Explore meditation, wellbeing, and mindfulness resources to help you find balance and peace."
      resources={resources}
    />
  );
}
