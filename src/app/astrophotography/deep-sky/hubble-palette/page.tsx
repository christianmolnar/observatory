import GalleryTemplate from '@/components/GalleryTemplate';
import { globalConfig } from '@/config/global';

export default function HubblePalettePage() {
  const hubblePaletteCategory = globalConfig.deepSky.categories.find(cat => cat.title === 'Hubble Palette');
  
  if (!hubblePaletteCategory) {
    return <div>Category not found</div>;
  }

  return (
    <GalleryTemplate
      title={hubblePaletteCategory.title}
      backgroundImage={hubblePaletteCategory.backgroundImage}
      imageFolder={hubblePaletteCategory.imageFolder}
    />
  );
}
