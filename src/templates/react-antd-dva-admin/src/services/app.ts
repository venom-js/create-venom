import { httpDelete, httpGet } from 'src/utils/request';

/**
 * @name 全局service
 */
const AppService = {
  /**
   * @name 获取会员等级tab
   */
  async queryBrandList() {
    const url = '/brand/list';
    return httpGet(url);
  }
};
export default AppService;
