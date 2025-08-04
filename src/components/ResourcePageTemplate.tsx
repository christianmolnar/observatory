'use client';

import React from 'react';
import Image from 'next/image';
import SiteLayout from '@/components/SiteLayout';

interface ResourceItem {
  name: string;
  link: string;
  description: string;
}

interface ResourceCategory {
  category: string;
  items: ResourceItem[];
}

interface ResourcePageProps {
  title: string;
  backgroundImage: string;
  description: string;
  resources: ResourceCategory[];
}

export default function ResourcePageTemplate({ title, backgroundImage, description, resources }: ResourcePageProps) {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-black">
        {/* Background Image */}
        <div className="fixed inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            className="object-cover opacity-50"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/20" />
        </div>

        {/* Resource Content */}
        <main className="relative z-10 pt-16 pb-16">
          <div className="max-w-6xl mx-auto px-6">
            {/* Page Title */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-light text-white tracking-[0.2em] mb-8">
                {title.toUpperCase()}
              </h1>
              <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
                {description}
              </p>
            </div>

            {/* Resource Categories */}
            <div className="max-w-4xl mx-auto space-y-12">
              {resources.map((category) => (
                <section key={category.category} className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-light text-yellow-400 tracking-[0.1em] mb-8 text-center">
                    {category.category.toUpperCase()}
                  </h2>
                  <div className="grid gap-3">
                    {category.items.map((item) => (
                      <div key={item.name} className="relative bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden shadow-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                        <div className="p-4">
                          <a 
                            href={item.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="block"
                          >
                            <h3 className="text-lg font-semibold text-white group-hover:text-yellow-400 transition-colors duration-300 mb-2 tracking-wide">
                              {item.name}
                            </h3>
                            <p className="text-white/70 text-sm leading-relaxed">
                              {item.description}
                            </p>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </main>
      </div>
    </SiteLayout>
  );
}
