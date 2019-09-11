import { SearchTableProps } from './type';
import React from 'react';

export const searchTableInitState = {
  /** @name 模糊搜索关键字 */
  keyword: '',
  /** @name 表格checkkeys */
  checkedkeys: [],
  /** @name 工具条切换 */
  visible: true,
  /** @name 分页 */
  pageProps: {
    total: 2,
    current: 0,
    pageSize: 1
  },
  /** @name 表格数据 */
  dataSource: [],
  /** @name 单选过滤条件 */
  singleParams: {},
  /** @name 日期过滤条件 */
  dateParams: {},
  /** @name 多选过滤条件 */
  multipleParams: {},
  /** @name 表格loading */
  loading: false
};

export type SearchTableState = typeof searchTableInitState;

interface SearchTableContextProps {
  props: SearchTableProps;
  state: SearchTableState;
  setState: (payload: Partial<SearchTableState>, callback?: () => any) => void;
  children: React.ReactNode;
}

export const SearchTableContext = React.createContext<
  Partial<SearchTableContextProps>
>({});

export function reducer(
  state: SearchTableState,
  { type, payload }
): SearchTableState {
  switch (type) {
    case 'setState':
      return { ...state, ...payload };
    default:
      throw new Error();
  }
}
