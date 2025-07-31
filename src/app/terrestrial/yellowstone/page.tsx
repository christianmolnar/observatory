import GalleryTemplate from '@/components/GalleryTemplate';
import { globalConfig } from '@/config/global';

export default function YellowstonePage() {
  const yellowstoneCategory = globalConfig.terrestrial.categories.find(cat => cat.title === 'Yellowstone');
  
  return (
    <GalleryTemplate
      title={yellowstoneCategory?.title || 'Yellowstone National Park'}
      backgroundImage={yellowstoneCategory?.backgroundImage || '/images/astrophotography/featured/Wizard-Lr-PI.jpg'}
      imageFolder={yellowstoneCategory?.imageFolder || 'terrestrial/yellowstone'}
    />
  );
}
