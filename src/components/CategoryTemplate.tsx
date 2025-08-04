'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SiteLayout from '@/components/SiteLayout';

interface CategoryItem {
  title: string;
  href: string;
  backgroundImage: string;
  description?: string;
}

interface CategoryPageProps {
  title: string;
  backgroundImage: string;
  categories: CategoryItem[];
  description?: string;
}

export default function CategoryTemplate({ title, backgroundImage, categories, description }: CategoryPageProps) {
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

        {/* Category Content */}
        <main className="relative z-10 pt-16 pb-16">
          <div className="max-w-6xl mx-auto px-6">
            {/* Page Title */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-light text-white tracking-[0.2em] mb-8">
                {title.toUpperCase()}
              </h1>
              {description && (
                <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
                  {description}
                </p>
            )}
          </div>

          {/* Category Grid - Larger Square Cards - Centered */}
          <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={category.href}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                {/* Large Square Glass Card */}
                <div className="relative bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden shadow-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 w-72 h-72">
                  {/* Background Image for Card */}
                  <div className="absolute inset-0">
                    <Image
                      src={category.backgroundImage}
                      alt={category.title}
                      fill
                      className="object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
                  </div>
                  
                  {/* Content Overlay */}
                  <div className="relative z-10 h-full flex flex-col justify-center items-center p-8 text-center">
                    <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white tracking-wider mb-4 group-hover:text-yellow-400 transition-colors duration-300">
                      {category.title.toUpperCase()}
                    </h2>
                    {category.description && (
                      <p className="text-white/80 text-sm tracking-wide">
                        {category.description}
                      </p>
                    )}
                    
                    {/* Subtle Arrow Indicator */}
                    <div className="mt-6 text-white/60 group-hover:text-yellow-400 transition-colors duration-300">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      </div>
    </SiteLayout>
  );
}
