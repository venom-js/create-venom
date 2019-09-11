/**
 * @name 全局应用model
 */
import { filterBreadCrumbs } from 'src/components/page-layout/utils';
import menuData from 'src/common/menu';
import { BasicDva } from 'src/components/basic-component/BasicDva';

const initState = {
  /**
   * @name 菜单收缩
   */
  collapsed: false,
  /**
   * @name 面包屑
   */
  breadCrumbs: []
};
export type AppModelState = Partial<typeof initState>;

const appModel = new BasicDva<AppModelState>({
  namespace: 'app',
  state: initState,
  effects: {
    /**
     * @name 获取当前面包屑
     */
    *filterBreadCrumbs({ payload }, { call, put }) {
      const breadCrumbs = [];
      filterBreadCrumbs(menuData, payload, breadCrumbs);
      yield put({
        type: 'updateState',
        payload: {
          breadCrumbs
        }
      });
    }
  }
}).render();

export default appModel;
