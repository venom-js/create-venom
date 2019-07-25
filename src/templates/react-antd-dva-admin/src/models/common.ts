/**
 * @name 会员规则model
 */
import { BasicDva } from 'src/components/basic-component/BasicDva';

const initState = {};
export type CommonModelState = Partial<typeof initState>;

const commonModel = new BasicDva<CommonModelState>({
  namespace: 'common',
  state: initState,
  effects: {}
}).render();

export default commonModel;
