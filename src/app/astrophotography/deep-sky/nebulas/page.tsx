import GalleryTemplate from '@/components/GalleryTemplate';
import { globalConfig } from '@/config/global';

export default function NebulasPage() {
  const nebulasCategory = globalConfig.deepSky.categories.find(cat => cat.title === 'Nebulas');
  
  return (
    <GalleryTemplate
      title={nebulasCategory?.title || 'Nebulas'}
      backgroundImage={nebulasCategory?.backgroundImage || '/images/astrophotography/featured/NGC7000-Pelican-1.jpg'}
      imageFolder={nebulasCategory?.imageFolder || 'astrophotography/nebulas'}
    />
  );
}
