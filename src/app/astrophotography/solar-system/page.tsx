import CategoryTemplate from '@/components/CategoryTemplate';
import { globalConfig } from '@/config/global';

export default function SolarSystemPage() {
  const { solarSystem } = globalConfig;
  
  return (
    <CategoryTemplate
      title={solarSystem.title}
      backgroundImage={solarSystem.backgroundImage}
      categories={solarSystem.categories}
    />
  );
}
