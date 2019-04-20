import GuestRoutes from './pages/guest';
import AuthRoutes from './pages/auth';
import SplashScreen from './pages/splash';

export default class Routes {
  // eslint-disable-next-line
  apply(routeHandler) {
    routeHandler.setPwaSchema({
      name: 'YouDeeSpot',
      short_name: 'YouDeeSpot',
      description: 'An awesome youtube playlist collector',
      icons: [
        {
          src: '/resources/img/youdeespot.png',
          sizes: '512x512'
        }
      ]
    });
    routeHandler.setDefaultSeoSchema({
      title: 'YouDeeSpot',
      author: 'Team 7',
      description: 'An awesome youtube playlist collector'
    });

    const routes = [
      ...GuestRoutes,
      ...SplashScreen,
    ];

    routeHandler.hooks.initRoutes.tapPromise('AppRoutes', async () => {
      routeHandler.addRoutes(routes);
    });
  }
}
