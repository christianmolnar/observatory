'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { globalConfig } from '@/config/global';

export default function Navigation() {
  const { navigation } = globalConfig;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Logo Section */}
        <div className="flex items-center justify-center pt-4 pb-2">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            {/* Observatory Logo */}
            <div
              className="flex items-center justify-center"
              style={{ maxWidth: '300px', width: '100%', height: 'auto' }}
            >
              <Image
                src={navigation.logo.src}
                alt={navigation.logo.alt}
                width={navigation.logo.width}
                height={navigation.logo.height}
                className="object-contain w-full h-auto"
                priority
                style={{ objectFit: 'contain' }}
              />
            </div>
          </Link>
        </div>

        {/* Centered Dividing Line */}
        <div className="flex justify-center pb-2">
          <div className="w-full max-w-[800px] h-px bg-white"></div>
        </div>

        {/* Navigation Links */}
        <div className="pb-4">
          <ul className="flex items-center justify-center space-x-8">
            {navigation.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-white hover:text-yellow-400 transition-colors duration-200 text-sm font-light tracking-wide"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
