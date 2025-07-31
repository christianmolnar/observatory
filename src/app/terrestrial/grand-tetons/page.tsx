import GalleryTemplate from '@/components/GalleryTemplate';
import { globalConfig } from '@/config/global';

export default function GrandTetonsPage() {
  const grandTetonsCategory = globalConfig.terrestrial.categories.find(cat => cat.title === 'Grand Tetons');
  
  return (
    <GalleryTemplate
      title={grandTetonsCategory?.title || 'Grand Tetons National Park'}
      backgroundImage={grandTetonsCategory?.backgroundImage || '/images/astrophotography/featured/SH2-132-The-LobsterClaw.jpg'}
      imageFolder={grandTetonsCategory?.imageFolder || 'terrestrial/grand-tetons'}
    />
  );
}
