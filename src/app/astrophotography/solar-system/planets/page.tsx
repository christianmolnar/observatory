import GalleryTemplate from '@/components/GalleryTemplate';
import globalConfig from '@/config/global';

export default function PlanetsPage() {
  return (
    <GalleryTemplate
      title="Planets"
      backgroundImage="/images/astrophotography/featured/M33-Done.jpg"
      imageFolder={globalConfig.imageFolders.solarSystem.planets}
    />
  );
}
