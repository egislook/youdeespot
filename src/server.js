import React from 'react';
import ReactPWAIcon from './resources/img/react-pwa.png';

/**
 * TODO!!!
 * 
 * Add this to pwajs server file to serve the files inside node_modules/@pwajs
 * app.use('/resources', express.static(process.cwd() + '/src/resources/'));
 * 
 * Add to src/server.js file to serve the static css
 * head.push(<link type="text/css" id="fucssStyle" rel="stylesheet" href="/resources/css/style.css" />)
 * 
 * Add to src/cleant.js to autoreload the file when its done with rerendering
 * document.querySelector('#fucssStyle').href = '/resources/css/style.css' + '?' + new Date().getTime();
 * 
 * Add to src/webpack.js fucss support
 * 
 * import { PwaFucssPlugin } from 'next-fucss';
 * 
 * and
 * 
 * addPlugin(new PwaFucssPlugin({
 *    styleFile: '/src/resources/css/style.css' 
 * }));
 * 
 */




export default class Server {
  // eslint-disable-next-line
  apply(serverHandler) {
    serverHandler.hooks.beforeHtmlRender.tapPromise('DSNPreCache', async (Application) => {
      // console.log(Application);
      const { htmlProps: { head } } = Application;
      head.push(<link key="dns-precache-demo-cdn" rel="preconnect" href="https://demo-cdn.reactpwa.com" />);
      head.push(<link key="dns-precache-codefund" rel="preconnect" href="https://codefund.app" />);
      head.push(<link key="dns-precache-google-analytics" rel="preconnect" href="https://www.google-analytics.com" />);
      head.push(<link key="dns-precache-googletagmanager" rel="preconnect" href="https://www.googletagmanager.com" />);
      head.push(<link key="dns-precache-cdn-codefund" rel="preconnect" href="https://cdn2.codefund.app" />);
      head.push(<meta key="meta-theme-color" name="theme-color" content="#209cee" />);
      //
    });

    serverHandler.hooks.beforeHtmlRender.tapPromise('AddFavIconAndFucss', async (Application) => {
      const { htmlProps: { head } } = Application;
      head.push(<link key="favicon" rel="shortcut icon" type="image/png" href={ReactPWAIcon} />);
      head.push(<link type="text/css" id="fucssStyle" rel="stylesheet" href="/resources/css/style.css" />)
      return true;
    });

    serverHandler.hooks.beforeHtmlRender.tapPromise('AddCodeFundScript', async (Application) => {
      Application.htmlProps.footer.push(<script id="js-codefund" async key="codefund" data-src="https://codefund.app/properties/136/funder.js" />);
    });

    serverHandler.hooks.beforeHtmlRender.tapPromise('AddGoogleTracking', async (Application) => {
      Application.htmlProps.footer.push(<script async key="googleanalyticslink" src="https://www.googletagmanager.com/gtag/js?id=UA-108804791-2" />);
      Application.htmlProps.footer.push(<script
        key="googleanalyticsscript"
        // eslint-disable-next-line
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-108804791-2');`,
        }}
      />);
    });
  }
}
