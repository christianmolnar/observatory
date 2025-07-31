// Global Site Configuration
// This file contains all configurable aspects of the site structure, content, and branding

import { observatoryConfig } from './observatory';

// Navigation Configuration
export const navigationConfig = {
  logo: {
    src: '/images/logo/Logo2.avif',
    alt: `${observatoryConfig.name} Logo`,
    width: 300,
    height: 100
  },
  items: [
    { label: 'Home', href: '/' },
    { label: 'Deep Sky', href: '/astrophotography/deep-sky' },
    { label: 'Solar System', href: '/astrophotography/solar-system' },
    { label: 'Terrestrial', href: '/terrestrial' },
    { label: 'Gear', href: '/equipment' },
    { label: 'Contact', href: '/contact' },
  ]
};

// Homepage Configuration
export const homepageConfig = {
  hero: {
    image: '/images/hero/NGC7000-Pelican-1.jpg',
    alt: 'NGC7000 Pelican Nebula - Maple Valley Observatory',
    title: observatoryConfig.name,
    tagline: observatoryConfig.tagline,
    description: [
      "Ever since I was a child, I've been obsessed with capturing photons from the distant past. Armed with modest gear and my love for astronomy and astrophotography, I set out to absorb light particles in all of their raw form and preserve the beauty of distant planets and deep sky objects forever, adding my interpretation in the painstaking processing of each image.",
      "This site is also a place where I can share the beauty of this planet we live in, so in it you will find my efforts to share the places I have had the good fortune to visit."
    ]
  },
  latestCaptures: {
    title: 'LATEST CAPTURES',
    subtitle: 'Fresh out of the oven. Careful. The plate is very hot!',
    backgroundImage: '/images/assets/NGC2070-Finished.jpg',
    showClearSkyClock: true
  }
};

// Deep Sky Categories Configuration
export const deepSkyConfig = {
  title: 'Deep Sky Objects',
  backgroundImage: '/images/assets/NGC7000-Pelican-1.jpg',
  categories: [
    {
      title: 'Galaxies',
      href: '/astrophotography/deep-sky/galaxies',
      backgroundImage: '/images/astrophotography/featured/M33-Done.jpg',
      description: 'Distant island universes beyond our Milky Way',
      imageFolder: 'astrophotography/galaxies'
    },
    {
      title: 'Nebulas',
      href: '/astrophotography/deep-sky/nebulas',
      backgroundImage: '/images/astrophotography/featured/NGC7000-Pelican-1.jpg',
      description: 'Stellar nurseries and cosmic clouds of gas and dust',
      imageFolder: 'astrophotography/nebulas'
    },
    {
      title: 'Star Clusters',
      href: '/astrophotography/deep-sky/star-clusters',
      backgroundImage: '/images/astrophotography/featured/Wizard-Lr-PI.jpg',
      description: 'Gravitationally bound groups of stars',
      imageFolder: 'astrophotography/star-clusters'
    }
  ]
};

// Solar System Categories Configuration
export const solarSystemConfig = {
  title: 'Solar System',
  backgroundImage: '/images/assets/NGC7000-Pelican-1.jpg',
  categories: [
    {
      title: 'Solar',
      href: '/astrophotography/solar-system/solar',
      backgroundImage: '/images/astrophotography/featured/NGC7000-Pelican-1.jpg',
      description: 'The Sun, solar eclipses, and solar phenomena',
      imageFolder: 'astrophotography/solar'
    },
    {
      title: 'Lunar',
      href: '/astrophotography/solar-system/lunar',
      backgroundImage: '/images/astrophotography/featured/IC445-The-Jellyfish.jpg',
      description: 'Moon phases and surface details',
      imageFolder: 'astrophotography/lunar'
    },
    {
      title: 'Planets',
      href: '/astrophotography/solar-system/planets',
      backgroundImage: '/images/astrophotography/featured/M33-Done.jpg',
      description: 'Jupiter, Saturn, Mars, and other planetary bodies',
      imageFolder: 'astrophotography/planets'
    },
    {
      title: 'Celestial Events',
      href: '/astrophotography/solar-system/events',
      backgroundImage: '/images/astrophotography/featured/SH2-132-The-LobsterClaw.jpg',
      description: 'Eclipses, conjunctions, transits, and rare astronomical events',
      imageFolder: 'astrophotography/events'
    }
  ]
};

// Terrestrial Categories Configuration
export const terrestrialConfig = {
  title: 'Terrestrial Photography',
  backgroundImage: '/images/assets/NGC7000-Pelican-1.jpg',
  categories: [
    {
      title: 'Yellowstone',
      href: '/terrestrial/yellowstone',
      backgroundImage: '/images/astrophotography/featured/Wizard-Lr-PI.jpg', // Replace with actual Yellowstone image
      description: 'Geysers, hot springs, and wildlife of America\'s first national park',
      imageFolder: 'terrestrial/yellowstone'
    },
    {
      title: 'Grand Tetons',
      href: '/terrestrial/grand-tetons',
      backgroundImage: '/images/astrophotography/featured/SH2-132-The-LobsterClaw.jpg', // Replace with actual Tetons image
      description: 'Majestic peaks and alpine landscapes of Wyoming',
      imageFolder: 'terrestrial/grand-tetons'
    }
  ]
};

// Equipment Page Configuration
export const equipmentConfig = {
  title: 'MY GEAR',
  backgroundImage: '/images/assets/NGC7000-Pelican-1.jpg',
  imageFolder: 'equipment',
  description: observatoryConfig.equipmentDescription
};

// Gallery Image Folders Configuration
export const imageFoldersConfig = {
  featured: 'astrophotography/featured',
  deepSky: {
    galaxies: 'astrophotography/galaxies',
    nebulas: 'astrophotography/nebulas',
    starClusters: 'astrophotography/star-clusters'
  },
  solarSystem: {
    solar: 'astrophotography/solar',
    lunar: 'astrophotography/lunar',
    planets: 'astrophotography/planets',
    events: 'astrophotography/events'
  },
  terrestrial: {
    yellowstone: 'terrestrial/yellowstone',
    grandTetons: 'terrestrial/grand-tetons'
  },
  equipment: 'equipment'
};

// Styling and Theme Configuration
export const styleConfig = {
  colors: {
    primary: '#FFD700', // Gold/Yellow
    secondary: '#FFFFFF',
    background: '#000000',
    overlay: 'rgba(0, 0, 0, 0.5)'
  },
  typography: {
    titleTracking: '0.2em',
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  layout: {
    maxWidth: '6xl', // Tailwind class
    cardAspectRatio: '3/4', // For portrait gallery cards
    squareCardSize: '288px' // For category cards
  }
};

// Default export combines all configurations
export const globalConfig = {
  observatory: observatoryConfig,
  navigation: navigationConfig,
  homepage: homepageConfig,
  deepSky: deepSkyConfig,
  solarSystem: solarSystemConfig,
  terrestrial: terrestrialConfig,
  equipment: equipmentConfig,
  imageFolders: imageFoldersConfig,
  style: styleConfig
};

export default globalConfig;
