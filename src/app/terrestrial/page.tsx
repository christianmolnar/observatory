import CategoryTemplate from '@/components/CategoryTemplate';
import { globalConfig } from '@/config/global';

export default function TerrestrialPage() {
  const { terrestrial } = globalConfig;
  
  return (
    <CategoryTemplate
      title={terrestrial.title}
      backgroundImage={terrestrial.backgroundImage}
      categories={terrestrial.categories}
    />
  );
}
