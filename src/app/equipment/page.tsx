import GalleryTemplate from '@/components/GalleryTemplate';
import { globalConfig } from '@/config/global';

export default function EquipmentPage() {
  return (
    <GalleryTemplate
      title={globalConfig.equipment.title}
      backgroundImage={globalConfig.equipment.backgroundImage}
      imageFolder={globalConfig.equipment.imageFolder}
    />
  );
}
