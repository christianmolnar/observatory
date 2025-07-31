import GalleryTemplate from '@/components/GalleryTemplate';
import globalConfig from '@/config/global';

export default function SolarPage() {
  return (
    <GalleryTemplate
      title="Solar"
      backgroundImage="/images/astrophotography/featured/NGC7000-Pelican-1.jpg"
      imageFolder={globalConfig.imageFolders.solarSystem.solar}
    />
  );
}
