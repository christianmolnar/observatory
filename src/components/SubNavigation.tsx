'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SubNavItem {
  label: string;
  href: string;
}

interface SubNavigationProps {
  items: SubNavItem[];
}

/**
 * DESIGN-PROTECTED COMPONENT: SubNavigation
 * 
 * DO NOT MODIFY without explicit user permission - see DESIGN_PROTECTION.md
 * 
 * Protected Elements:
 * - Positioning: fixed top-[160px] left-0 right-0 z-30
 * - Styling: text-lg font-normal drop-shadow-lg
 * - Colors: text-white hover:text-white/90 active:text-amber-400
 * - Visibility logic: Only shows on leaf pages via SiteLayout.tsx
 * 
 * Current Behavior: Floats over background image without backdrop
 */
export default function SubNavigation({ items }: SubNavigationProps) {
  const pathname = usePathname();

  return (
    <>
      {/* DESIGN-PROTECTED: Positioning - floats over image without background */}
      <div className="fixed top-[160px] left-0 right-0 z-30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="py-3">
            {/* DESIGN-PROTECTED: Layout and spacing */}
            <ul className="flex items-center justify-center space-x-8">
            {items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  {/* DESIGN-PROTECTED: Text styling - large font with drop shadow for visibility over images */}
                  <Link
                    href={item.href}
                    className={`text-lg font-normal tracking-wide transition-colors duration-200 drop-shadow-lg ${
                      isActive 
                        ? 'text-amber-400' 
                        : 'text-white hover:text-white/90'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {/* DESIGN-PROTECTED: End SubNavigation container */}
      </div>
    </>
  );
}
