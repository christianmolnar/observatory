import GalleryTemplate from '@/components/GalleryTemplate';
import globalConfig from '@/config/global';

export default function LunarPage() {
  return (
    <GalleryTemplate
      title="Lunar"
      backgroundImage="/images/astrophotography/featured/IC445-The-Jellyfish.jpg"
      imageFolder={globalConfig.imageFolders.solarSystem.lunar}
    />
  );
}
