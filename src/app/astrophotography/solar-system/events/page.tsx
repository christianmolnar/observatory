import CategoryTemplate from '@/components/CategoryTemplate';
import { globalConfig } from '@/config/global';

export default function CelestialEventsPage() {
  const { celestialEvents } = globalConfig;
  
  return (
    <CategoryTemplate
      title={celestialEvents.title}
      backgroundImage={celestialEvents.backgroundImage}
      categories={celestialEvents.categories}
      description={celestialEvents.description}
    />
  );
}
