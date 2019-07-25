import React, { useContext } from 'react';
import { Row, Col, Icon } from 'antd';
import { filterEmpty } from '../utils';
import FilterTag from './FilterToolTags';
import { SearchTableContext } from '../reducer';

const FilterTool: React.FC = () => {
  const { state } = useContext(SearchTableContext);
  const visible =
    state.keyword ||
    (state.singleParams &&
      Object.keys(filterEmpty(state.singleParams)).length) ||
    (state.dateParams && Object.keys(filterEmpty(state.dateParams)).length) || 
    (state.multipleParams && Object.keys(filterEmpty(state.multipleParams)).length);
  return (
    <Row type="flex" style={{ minHeight: 34 }}>
      <Col>
        <Icon
          theme="filled"
          className="ft-20"
          style={{ color: '#CED1D7' }}
          type="filter"
        />
      </Col>
      {visible ? (
        <FilterTag />
      ) : (
        <span style={{ marginLeft: 4, color: '#9397A3' }}>
          筛选设置的过滤条件将在这里展示
        </span>
      )}
    </Row>
  );
};

export default FilterTool;
