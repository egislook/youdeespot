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
      {
        path: '/playlists',
        exact: true,
        component: () => import('./components/playlist'),
      },
      {
        path: '/',
        exact: true,
        component: () => import('./components/home'),
      }
    ];

    routeHandler.hooks.initRoutes.tapPromise('AppRoutes', async () => {
      routeHandler.addRoutes(routes);
    });
  }
}
