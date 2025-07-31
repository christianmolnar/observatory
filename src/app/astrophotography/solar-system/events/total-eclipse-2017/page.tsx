import GalleryTemplate from '@/components/GalleryTemplate';
import { globalConfig } from '@/config/global';

export default function TotalEclipse2017Page() {
  return (
    <GalleryTemplate
      title="Total Eclipse 2017"
      backgroundImage="/images/astrophotography/featured/SH2-132-The-LobsterClaw.jpg"
      imageFolder={globalConfig.imageFolders.celestialEvents.totalEclipse2017}
    />
  );
}
