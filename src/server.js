import React from 'react';
const favicon = '/resources/img/youdeespot.png';
const fucssStyle = '/resources/css/style.css';

export default class Server {
  // eslint-disable-next-line
  apply(serverHandler) {
    
    serverHandler.hooks.beforeHtmlRender.tapPromise('AddFavIconAndFucss', async (Application) => {
      const { htmlProps: { head } } = Application;
      head.push(<meta key="meta-theme-color" name="theme-color" content="#28D29C" />);
      head.push(<link key="favicon" rel="shortcut icon" type="image/png" href={favicon} />);
      head.push(<link key="fucssStyle" type="text/css" id="fucssStyle" rel="stylesheet" href={fucssStyle} />)
      return true;
    });
    
    // serverHandler.hooks.beforeHtmlRender.tapPromise('DSNPreCache', async (Application) => {
    //   // console.log(Application);
    //   const { htmlProps: { head } } = Application;
    //   // head.push(<link key="dns-precache-demo-cdn" rel="preconnect" href="https://demo-cdn.reactpwa.com" />);
    //   // head.push(<link key="dns-precache-codefund" rel="preconnect" href="https://codefund.app" />);
    //   // head.push(<link key="dns-precache-google-analytics" rel="preconnect" href="https://www.google-analytics.com" />);
    //   // head.push(<link key="dns-precache-googletagmanager" rel="preconnect" href="https://www.googletagmanager.com" />);
    //   // head.push(<link key="dns-precache-cdn-codefund" rel="preconnect" href="https://cdn2.codefund.app" />);
      
    //   //
    // });

    // serverHandler.hooks.beforeHtmlRender.tapPromise('AddCodeFundScript', async (Application) => {
    //   Application.htmlProps.footer.push(<script id="js-codefund" async key="codefund" data-src="https://codefund.app/properties/136/funder.js" />);
    // });

    // serverHandler.hooks.beforeHtmlRender.tapPromise('AddGoogleTracking', async (Application) => {
    //   Application.htmlProps.footer.push(<script async key="googleanalyticslink" src="https://www.googletagmanager.com/gtag/js?id=UA-108804791-2" />);
    //   Application.htmlProps.footer.push(<script
    //     key="googleanalyticsscript"
    //     // eslint-disable-next-line
    //     dangerouslySetInnerHTML={{
    //       __html: `window.dataLayer = window.dataLayer || [];
    //         function gtag(){dataLayer.push(arguments);}
    //         gtag('js', new Date());
    //         gtag('config', 'UA-108804791-2');`,
    //     }}
    //   />);
    // });
  }
}
