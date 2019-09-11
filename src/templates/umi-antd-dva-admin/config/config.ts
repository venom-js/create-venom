import { resolve } from 'path';
import proxy from './proxyConfig';
import theme from './theme';
function getRouter(router) {
  if (router.routes) {
    router.routes = router.routes
      .filter(({ component }) => {
        if (component.indexOf('page.tsx') >= 0) {
          return true;
        }
        if (
          component.indexOf('Page.tsx') >= 0 ||
          component.indexOf('404.tsx') >= 0
        ) {
          return true;
        }
        return false;
      })
      .map(item => {
        if (!item.path) {
          return item;
        }
        return {
          ...item,
          path: item.path
            .replace('index/indexPage', '')
            .replace('indexPage', '')
            .replace('Page', '')
            .replace('page', '')
        };
      });
  }
  return router;
}
export default {
  // proxy,
  // theme,
  history: 'hash',
  publicPath: '/coty-CRM-new/dist/',
  hash: true,
  treeShaking: true,
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: {
          dynamicImport: false
        },
        dva: {
          dynamicImport: false
        },
        dynamicImport: {
          loadingComponent: '../src/common/loading'
        },
        dll: false,
        routes: {
          update(routes) {
            return routes.map(item => {
              return getRouter(item);
            });
          }
        },
        hardSource: false
      }
    ]
  ],
  alias: {
    src: resolve(__dirname, '../src')
  }
};
