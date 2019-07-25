import React from 'react';
import { FilterType } from '../enum';
import FilterSelect from './FilterSelect';
import _ from 'lodash';
import FilterDatePick from './FilterDatePick';
import FilterTreeSelect from './FilterTreeSelect';

interface SearchTableFilterProps {
  state: any;
  setState: any;
  dataIndex: string;
  type: 'single' | 'multiple' | 'date';
  title: string;
  dataSource?: any[];
}

const SearchTableFilter: React.FC<SearchTableFilterProps> = props => {
  let renderDom = null;
  const { state, setState, dataIndex, type, title } = props;
  switch (type) {
    case FilterType.Single:
      renderDom = (
        <FilterSelect
          open={state.open}
          title={title}
          dataSource={props.dataSource}
          onChange={value =>
            setState({
              filterParams: {
                ...state.filterParams,
                [dataIndex]: {
                  value,
                  type: FilterType.Single
                }
              }
            })
          }
          value={_.get(state.filterParams, `${dataIndex}.value`)}
        />
      );
      break;
    case FilterType.Date:
      renderDom = (
        <FilterDatePick
          open={state.open}
          title={title}
          setOpen={open => setState({ open })}
          onChange={value => {
            setState({
              filterParams: {
                ...state.filterParams,
                [dataIndex]: {
                  value,
                  type: FilterType.Date
                }
              }
            });
          }}
          value={_.get(state.filterParams, `${dataIndex}.value.value`)}
        />
      );
      break;
    case FilterType.Multiple:
      renderDom = (
        <FilterTreeSelect
          open={state.open}
          dataSource={props.dataSource}
          title={title}
          value={_.get(state.filterParams, `${dataIndex}.value.value`)}
          onChange={value =>
            setState({
              filterParams: {
                ...state.filterParams,
                [dataIndex]: {
                  value,
                  type: FilterType.Multiple
                }
              }
            })
          }
        />
      );
      break;
    default:
      break;
  }
  return renderDom;
};

export default SearchTableFilter;
