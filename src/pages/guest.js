import fetch from 'universal-fetch';
import skeleton from '../components/skeleton';
import FeaturesImage from '../resources/img/seo/features.png';
import CSSGlobalLocalImage from '../resources/img/seo/css-global-local.png';
import SkeletonImage from '../resources/img/seo/skeleton-loading.png';
import ImageOptimizationImage from '../resources/img/seo/image-optimization.png';

export default [
  {
    path: '/home',
    exact: true,
    component: () => import('../components/home'),
    seo: {
      title: 'Home | ReactPWA Demo',
      description: 'Feature set offered by ReactPWA with pluggable @pawjs plugins. ReactPWA is highly customizable and once can achieve anything as it is extendable',
      image: FeaturesImage,
    },
  }
];
