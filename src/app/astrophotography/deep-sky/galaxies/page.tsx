import GalleryTemplate from '@/components/GalleryTemplate';
import { globalConfig } from '@/config/global';

export default function GalaxiesPage() {
  const galaxiesCategory = globalConfig.deepSky.categories.find(cat => cat.title === 'Galaxies');
  
  return (
    <GalleryTemplate
      title={galaxiesCategory?.title || 'Galaxies'}
      backgroundImage={galaxiesCategory?.backgroundImage || '/images/astrophotography/featured/M33-Done.jpg'}
      imageFolder={galaxiesCategory?.imageFolder || 'astrophotography/galaxies'}
    />
  );
}
