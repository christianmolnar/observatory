import GalleryTemplate from '@/components/GalleryTemplate';
import globalConfig from '@/config/global';

export default function CelestialEventsPage() {
  return (
    <GalleryTemplate
      title="Celestial Events"
      backgroundImage="/images/astrophotography/featured/SH2-132-The-LobsterClaw.jpg"
      imageFolder={globalConfig.imageFolders.solarSystem.events}
    />
  );
}
