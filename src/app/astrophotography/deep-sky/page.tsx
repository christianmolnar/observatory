import CategoryTemplate from '@/components/CategoryTemplate';
import { globalConfig } from '@/config/global';

export default function DeepSkyPage() {
  const { deepSky } = globalConfig;
  
  return (
    <CategoryTemplate
      title={deepSky.title}
      backgroundImage={deepSky.backgroundImage}
      categories={deepSky.categories}
    />
  );
}
