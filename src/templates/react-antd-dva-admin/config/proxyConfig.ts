const devPath = 'http://47.99.119.242:8082/';
export default {
  '/member/': {
    target: devPath,
    changeOrigin: false
  },
  '/brand/': {
    target: devPath,
    changeOrigin: false
  },
};
