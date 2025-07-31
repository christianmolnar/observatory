import GalleryTemplate from '@/components/GalleryTemplate';
import { globalConfig } from '@/config/global';

export default function StarClustersPage() {
  const starClustersCategory = globalConfig.deepSky.categories.find(cat => cat.title === 'Star Clusters');
  
  return (
    <GalleryTemplate
      title={starClustersCategory?.title || 'Star Clusters'}
      backgroundImage={starClustersCategory?.backgroundImage || '/images/astrophotography/featured/Wizard-Lr-PI.jpg'}
      imageFolder={starClustersCategory?.imageFolder || 'astrophotography/star-clusters'}
    />
  );
}
