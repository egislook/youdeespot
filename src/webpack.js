// import SassPlugin from '@pawjs/sass/webpack';
import SrcsetPlugin from '@pawjs/srcset/webpack';
import ImageOptimizer from '@pawjs/image-optimizer/webpack';
import { PwaFucssPlugin } from 'next-fucss';
// import SassPlugin from '@pawjs/pwa-sass/webpack';

export default class ProjectWebpack {
  constructor(config) {
    // console.log(config);
    config.test = true;
    const { addPlugin } = config;
    // Add sass compiler to the project
    // addPlugin(new SassPlugin());
    addPlugin(new PwaFucssPlugin({
      styleFile: '/src/resources/css/style.css'
    }));
    
    const optimizerOptions = {
      supportedEnv: [ 'production' ],
      configLabel: 'MEDIUM_QUALITY',
    };
    addPlugin(new ImageOptimizer(optimizerOptions));

    addPlugin(new SrcsetPlugin());
  }
}
