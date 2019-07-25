import React, { useReducer, useEffect } from 'react';
import { Card } from 'antd';
import { SearchTableProps } from './type';
import SearchTool from './components/SearchTool';
import TableTool from './components/TableTool';
import {
  reducer,
  searchTableInitState,
  SearchTableState,
  SearchTableContext
} from './reducer';
import FilterTool from './components/FilterTool';
import { httpGet, httpPost } from 'src/utils/request';
import { filterSearchParams } from 'src/utils/utils';
import TablePro from './components/TablePro';
import {
  formatFilterValue,
  rebuildSingleParams,
  rebuildDateParams,
  rebuildMultipleParams
} from './utils';

const SearchTable: React.FC<SearchTableProps> = props => {
  const [state, dispatch] = useReducer(reducer, searchTableInitState);

  const setState = (
    payload: Partial<SearchTableState>,
    callback?: () => any
  ) => {
    dispatch({ payload, type: 'setState' });
    if (callback) {
      callback();
    }
  };

  const queryList = async () => {
    const { singleParams, multipleParams, dateParams } = formatFilterValue(
      props,
      state
    );
    setState({
      singleParams,
      dateParams,
      multipleParams,
      loading: true
    });

    /** @name 重新构造单选filter入参 */
    const singleParamsResult = rebuildSingleParams(singleParams);
    /** @name 重新构造日期filter入参 */
    const dateParamsResult = rebuildDateParams(dateParams, props.dateKeys);
    /** @name 重新构造多选filter入参 */
    const multipleParamsResult = rebuildMultipleParams(multipleParams);

    /** @name 整合搜索入参 */
    const searchParams = filterSearchParams({
      ...state.pageProps,
      keyword: state.keyword,
      ...singleParamsResult,
      ...dateParamsResult,
      ...multipleParamsResult
    });
    //  const { method, url } = props.ajxaProps;
    // const ajxa =
    //   method === 'GET'
    //     ? httpGet(url, searchParams)
    //     : httpPost(url, searchParams);
    // const {
    //   data: { code, data }
    // } = await ajxa;
    // if (code === 200 && data) {
    //   setState({
    //     dataSource: data，
    //   });
    // }

    setState({ loading: false });

    /** @name 向外部拓传搜索参数 */
    if (props.getSearchParams) {
      props.getSearchParams(searchParams);
    }

    return () => {
      setState(searchTableInitState);
    };
  };

  useEffect(() => {
    queryList();
  }, [props.filterParams, state.pageProps, state.keyword]);

  return (
    <SearchTableContext.Provider
      value={{ props, state, setState, children: props.children }}
    >
      <Card>
        <div style={{ minHeight: 80 }}>
          {state.visible ? <SearchTool /> : <TableTool />}
        </div>
        <FilterTool />
        <div className="mg-t1x">
          <TablePro>{props.children}</TablePro>
        </div>
      </Card>
    </SearchTableContext.Provider>
  );
};

export default SearchTable;
