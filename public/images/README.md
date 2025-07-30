# Image Asset Organization

## Folder Structure

### `/public/images/logo/`
Upload your observatory logo here. Recommended formats:
- `logo.svg` - Vector format (preferred for scalability)
- `logo.png` - High-resolution PNG with transparent background
- `logo-white.png` - White version for dark backgrounds
- `favicon.ico` - Browser favicon

### `/public/images/hero/`
Your main hero/background image for the homepage:
- `hero-main.jpg` - Primary hero image (high resolution, 1920x1080 or larger)
- `hero-mobile.jpg` - Mobile-optimized version (optional)

Recommended: A stunning astrophotography image that represents your work well

### `/public/images/astrophotography/`
Organize your astrophotography by category:
- `deep-sky/` - Nebulae, galaxies, star clusters
- `planetary/` - Moon, planets, solar system objects  
- `solar/` - Sun photography, solar eclipses
- `wide-field/` - Milky Way, constellations

### `/public/images/terrestrial/`
Organize by your collection structure:
- `national-parks/` - National park photography
- `pacific-northwest/` - Regional landscapes
- `local/` - Local area photography
- `seasonal/` - Seasonal collections
- `wildlife/` - Wildlife photography

### `/public/images/equipment/`
Equipment photos and setups:
- `telescopes/` - Individual telescope photos
- `setup/` - Observatory setup photos
- `accessories/` - Cameras, mounts, accessories

## Image Optimization Tips

### For Web Performance:
- **Hero images**: 1920x1080px, JPG, ~200-500KB
- **Gallery thumbnails**: 800x800px, JPG, ~100-200KB  
- **Full-size gallery**: 2048x2048px max, JPG, ~500KB-1MB
- **Equipment photos**: 1200x800px, JPG, ~200-400KB

### File Naming Convention:
- Use lowercase, hyphens for spaces: `orion-nebula-m42.jpg`
- Include object designation when applicable: `andromeda-galaxy-m31.jpg`
- For equipment: `seestar-s50-setup.jpg`

### Image Formats:
- **JPG**: For photographs (astrophotography, landscapes)
- **PNG**: For logos, graphics with transparency
- **SVG**: For logos and icons (preferred)
- **WebP**: Modern format (Next.js will auto-convert)

## Current Placeholders to Replace:

1. **Logo**: Update Navigation component to use `/images/logo/logo.svg`
2. **Hero Image**: Replace `/images/hero/hero-placeholder.jpg` in page.tsx
3. **Latest Captures**: Add 3 featured astrophotography images
4. **Equipment Photos**: SeeStar S30/S50 product photos

## Next Steps:
1. Upload your logo files
2. Choose and upload a hero image  
3. Upload 3-6 of your best astrophotography images for "Latest Captures"
4. Upload equipment photos for the gear section

The website is set up to automatically optimize and serve these images efficiently!
