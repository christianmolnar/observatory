import React from 'react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import LatestCapturesCarousel from '@/components/LatestCapturesCarousel';
import observatoryConfig from '@/config/observatory';

export default function Home() {
  return (
    <>
      <Navigation />
      {/* Hero Section with Floating Text */}
      <div className="relative pt-32">
        {/* Hero Image - Smaller height so Latest Captures are clearly visible */}
        <div className="h-[75vh] relative overflow-hidden">
          <Image
            src="/images/hero/M42-20x240sec-2-7-2005-2547x1813.jpg"
            alt="M42 Orion Nebula - Maple Valley Observatory"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          {/* Lighter overlay for better image visibility */}
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* Floating Text Overlay - Positioned at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent pb-8 pt-12">
          <div className="max-w-5xl mx-auto px-6 text-center">
            {/* Main Title - Smaller to fit one line */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wider text-yellow-400 mb-2 uppercase">
              {observatoryConfig.name}
            </h1>
            {/* Tagline right under title - back to nav font style */}
            <p className="text-base md:text-lg text-gray-300 mb-8 font-light tracking-wide">
              {observatoryConfig.tagline}
            </p>
            {/* Description Paragraph - Smaller font */}
            <div className="max-w-3xl mx-auto">
              <p className="text-sm md:text-base text-gray-400 leading-relaxed font-light">
                Ever since I was a child, I&apos;ve been obsessed with capturing photons from the distant past. Armed with modest gear and my love for 
                astronomy and astrophotography, I set out to absorb light particles in all of their raw form and preserve the beauty of distant planets and 
                deep sky objects forever, adding my interpretation in the painstaking processing of each image.
              </p>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed font-light mt-4">
                I have also decided that this site will be a place where I can share the beauty of this planet we live in, so in it you will find my efforts to 
                share the places I have had the good fortune to visit.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Captures Section - Reduced top space and fun copy */}
      <section
        className="py-8 px-6 relative"
        style={{
          backgroundColor: '#000',
          backgroundImage: 'url(/images/assets/NGC2070-Finished.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wider text-white mb-2 uppercase">
              LATEST CAPTURES
            </h2>
            <p className="text-lg md:text-xl text-white font-semibold mb-4 drop-shadow-lg">
              Just came out of the oven. Careful. The plate is very hot!
            </p>
            <div className="flex justify-center">
              <div className="w-[400px] h-1 bg-white"></div>
            </div>
          </div>
          <LatestCapturesCarousel />
        </div>
      </section>
    </>
  );
}