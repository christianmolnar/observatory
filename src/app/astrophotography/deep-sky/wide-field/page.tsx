import GalleryTemplate from "@/components/GalleryTemplate";
import { globalConfig } from "@/config/global";

export default function WideFieldPage() {
  const { wideField } = globalConfig;
  
  return (
    <GalleryTemplate
      title={wideField.title}
      backgroundImage={wideField.backgroundImage}
      imageFolder={wideField.imageFolder}
    />
  );
}
