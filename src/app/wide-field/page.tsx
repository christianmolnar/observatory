import GalleryTemplate from '@/components/GalleryTemplate';
import { globalConfig } from '@/config/global';

export default function WideFieldPage() {
  return (
    <GalleryTemplate
      title={globalConfig.wideField.title}
      backgroundImage={globalConfig.wideField.backgroundImage}
      imageFolder={globalConfig.wideField.imageFolder}
    />
  );
}
