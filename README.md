# Maple Valley Observatory

A modern, beautiful portfolio website showcasing astrophotography and terrestrial photography with automated metadata generation and smart astronomical object recognition.

**Tagline**: "Capturing Photons Since Last Century"

## Features

- **Automated Metadata Generation**: Intelligent recognition of astronomical objects from filenames
- **Comprehensive Astronomical Database**: 200+ objects from 8 major catalogs (Messier, NGC, IC, Caldwell, Sharpless, Barnard, Abell, vdB)
- **Smart Filename Parsing**: Handles both catalog designations ("NGC6888.jpg") and common names ("Crescent Nebula.jpg")
- **Dynamic Gallery Loading**: New images automatically appear in galleries when added to folders
- **Configurable Branding**: Easy rebranding for any observatory location
- **Mobile-First Design**: Optimized for all devices with dark theme for astrophotography viewing

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Run development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Adding New Images

1. **Astrophotography**: Place images in `public/images/astrophotography/`, `public/images/astrophotography/deep-sky/`, or `public/images/astrophotography/solar-system/`
2. **Wide Field**: Place images in `public/images/wide-field/`
3. **Terrestrial**: Place images in `public/images/terrestrial/`
4. **Equipment**: Place images in `public/images/equipment/`

After adding images, run the metadata generation script:

```bash
node update-metadata.js
```

This will automatically:
- Recognize astronomical objects from filenames
- Generate catalog designations and proper names
- Update the metadata.json file
- Make images appear in galleries immediately

## Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── astrophotography/
│   ├── terrestrial/
│   ├── wide-field/
│   ├── equipment/
│   └── contact/
├── components/          # React components
├── config/             # Configuration files
│   ├── global.ts       # Navigation and global settings
│   └── observatory.ts  # Observatory-specific branding
├── data/               # Generated metadata
│   └── metadata.json   # Image metadata database
└── styles/             # CSS and design tokens

public/
└── images/             # Image galleries (auto-loaded)
    ├── astrophotography/
    ├── wide-field/
    ├── terrestrial/
    └── equipment/
```

## Configuration

### Rebranding for Your Observatory

Edit `src/config/observatory.ts` to customize:
- Observatory name and tagline
- Location details and coordinates
- Owner information and contact details
- Mission statement
- Equipment descriptions
- Clear Sky Clock integration

### Navigation Customization

Edit `src/config/global.ts` to modify:
- Navigation menu items
- Page configurations
- Gallery categories and descriptions

## Astronomical Object Recognition

The system automatically recognizes objects from these catalogs:

- **Messier** (M1-M110): Famous deep sky objects
- **NGC** (New General Catalogue): Comprehensive catalog of nebulae, clusters, and galaxies
- **IC** (Index Catalogue): Supplement to NGC
- **Caldwell** (C1-C109): Best non-Messier objects for amateur astronomers
- **Sharpless** (Sh2-xxx): Emission nebulae
- **Barnard** (B1-B366): Dark nebulae
- **Abell** (A1-A86): Planetary nebulae
- **van den Bergh** (vdB1-vdB158): Reflection nebulae

### Supported Filename Formats

- Catalog designations: `M42.jpg`, `NGC6888.jpg`, `IC 5146.jpg`
- Common names: `Orion Nebula.jpg`, `Crescent Nebula.jpg`, `Cocoon Nebula.jpg`
- Mixed formats: `M42-Orion-Final.jpg`, `NGC7000-Pelican.jpg`

## Technology Stack

- **Framework**: Next.js 15.4.5 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **Image Optimization**: Built-in Next.js optimization
- **Deployment**: Optimized for Vercel

## Performance Features

- **Image Optimization**: WebP/AVIF formats with responsive sizing
- **Lazy Loading**: Progressive loading for large galleries
- **SEO Optimized**: Meta tags, schema markup, and sitemaps
- **Mobile Performance**: Optimized for all devices
- **Dark Theme**: Designed for astrophotography viewing

## Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `node update-metadata.js` - Generate/update image metadata

## Contributing

1. Add new images to appropriate folders in `public/images/`
2. Run `node update-metadata.js` to update metadata
3. Test galleries load correctly
4. Update configuration files as needed for branding

## License

Private project for Maple Valley Observatory portfolio.
