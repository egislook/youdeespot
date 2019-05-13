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
        path: '/playlist/:playlistId',
        exact: true,
        component: () => import('./pages/playlist/index'),
      },
      {
        path: '/',
        exact: true,
        component: () => import('./pages/home/index'),
      }
    ];

    routeHandler.hooks.initRoutes.tapPromise('AppRoutes', async () => {
      routeHandler.addRoutes(routes);
    });
  }
}
