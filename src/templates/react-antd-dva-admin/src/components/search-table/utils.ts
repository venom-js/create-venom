import { FilterType } from './enum';
import { SearchTableProps, DateKeysProps } from './type';
import { SearchTableState } from './reducer';

/**
 * @name 过滤空值
 * @param values
 */
export function filterEmpty(values) {
  Object.keys(values).map(item => {
    if (values[item] !== 0 && !values[item]) {
      delete values[item];
    }
  });
  return values;
}

/**
 * @name 根据外部filter条件重新构造组件内部渲染用的数据结构
 * @param props
 * @param state
 */
export const formatFilterValue = (
  props: SearchTableProps,
  state: SearchTableState
) => {
  const { filterParams } = props;
  let result = {
    singleParams: state.singleParams,
    dateParams: state.dateParams,
    multipleParams: state.multipleParams
  };
  Object.keys(filterParams).forEach(key => {
    const item = filterParams[key];
    switch (item.type) {
      case FilterType.Single:
        result = item.value
          ? {
            ...result,
            singleParams: { ...result.singleParams, [key]: item.value }
          }
          : {
            ...result,
            singleParams: { ...result.singleParams, [key]: undefined }
          };
        break;
      case FilterType.Date:
        result = item.value
          ? {
            ...result,
            dateParams: { ...result.dateParams, [key]: item.value }
          }
          : {
            ...result,
            dateParams: { ...result.dateParams, [key]: undefined }
          };
        break;
      case FilterType.Multiple:
        result = item.value
          ? {
            ...result,
            multipleParams: { ...result.multipleParams, [key]: item.value }
          }
          : {
            ...result,
            multipleParams: { ...result.multipleParams, [key]: undefined }
          };
        break;
      default:
        break;
    }
  });
  return result;
};

/**
 * @name 构造单选filter搜索入参
 */
export const rebuildSingleParams = singleParams => {
  const result = {};
  if (!Object.keys(filterEmpty(singleParams)).length) {
    return {};
  }
  Object.keys(singleParams).forEach(item => {
    result[item] = singleParams[item].key;
  });
  return result;
};

/**
 * @name 构造日期filter搜索入参
 */
export const rebuildDateParams = (dateParams: any, dateKeys: DateKeysProps) => {
  const result = {};
  if (!Object.keys(filterEmpty(dateParams)).length) {
    return {};
  }
  Object.keys(dateParams).forEach(key => {
    dateKeys[key].forEach((item, index) => {
      result[item] = dateParams[key].value[index];
    });
  });
  return result;
};

/**
 * @name 构造日期filter搜索入参
 */
export const rebuildMultipleParams = (multipleParams: any) => {
  const result = {};
  if (!Object.keys(filterEmpty(multipleParams)).length) {
    return {};
  }
  Object.keys(multipleParams).forEach(key => {
    result[key] = multipleParams[key].value.map(item2 => item2.value);
  });
  return result;
};
