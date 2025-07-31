'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navigation from './Navigation';
import SubNavigation from './SubNavigation';
import { globalConfig } from '@/config/global';

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  const pathname = usePathname();
  
  // DESIGN-PROTECTED: SubNavigation visibility logic
  // DO NOT MODIFY without user permission - controls when sub-nav appears
  // Function to get the base path for sub-navigation matching
  const getBasePath = (path: string) => {
    const segments = path.split('/').filter(Boolean);
    
    // For astrophotography paths like /astrophotography/deep-sky/galaxies, return /astrophotography/deep-sky
    if (segments[0] === 'astrophotography' && segments.length >= 2) {
      return `/${segments[0]}/${segments[1]}`;
    }
    
    // For terrestrial paths like /terrestrial/yellowstone, return /terrestrial
    if (segments[0] === 'terrestrial') {
      return '/terrestrial';
    }
    
    return path;
  };

  // DESIGN-PROTECTED: Critical logic - determines leaf pages vs category pages
  // Function to determine if we're on a leaf page (should show sub-navigation)
  const isLeafPage = (path: string) => {
    const segments = path.split('/').filter(Boolean);
    
    // Show sub-navigation only on leaf pages (3+ segments for astrophotography paths)
    // Examples: /astrophotography/deep-sky/galaxies, /astrophotography/solar-system/lunar
    // Don't show on: /astrophotography/deep-sky, /astrophotography/solar-system
    if (segments.length >= 3 && segments[0] === 'astrophotography') {
      return true;
    }
    
    // For terrestrial, show sub-navigation on leaf pages like /terrestrial/yellowstone
    // Don't show on the category page /terrestrial
    if (segments.length >= 2 && segments[0] === 'terrestrial') {
      return true;
    }
    
    return false;
  };

  const basePath = getBasePath(pathname);
  const subNavItems = globalConfig.subNavigation[basePath as keyof typeof globalConfig.subNavigation];
  const shouldShowSubNav = isLeafPage(pathname) && subNavItems;

  return (
    <>
      <Navigation />
      {shouldShowSubNav && <SubNavigation items={subNavItems} />}
      <div className="pt-[148px]">
        {children}
      </div>
    </>
  );
}
