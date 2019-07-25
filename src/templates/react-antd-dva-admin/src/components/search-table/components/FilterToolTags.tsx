import React, { useContext, Fragment } from 'react';
import { Col, Tag, Row } from 'antd';
import { FilterType } from '../enum';
import moment from 'moment';
import { TagProps } from 'antd/lib/tag';
import { SearchTableContext } from '../reducer';
import _ from 'lodash';

const tagProps: TagProps = {
  style: { padding: '2px 12px', borderRadius: 13 },
  closable: true
};

const format = 'YYYY-MM-DD';

const FilterTag: React.FC = () => {
  const { props, state, setState } = useContext(SearchTableContext);
  const handleClearMultiple = (deleteItem: any, key: string, title: string) => {
    const difValue = _.difference(state.multipleParams[key].value, [
      deleteItem
    ]);
    const value = difValue.length ? { title, value: difValue } : undefined;
    props.setFilterParams({
      [key]: {
        value,
        type: FilterType.Multiple
      }
    });
  };
  return (
    <Fragment>
      <Col>
        <a
          href="javascript:;"
          className="mg-l2x mg-r2x"
          onClick={() => {
            setState({
              keyword: '',
              singleParams: {},
              dateParams: {},
              multipleParams: {}
            });
            props.setFilterParams({});
          }}
        >
          清空
        </a>
      </Col>
      <Col span={22}>
        <Row type="flex">
          <Col>
            {state.keyword && (
              <Tag
                color="#32D1AD"
                {...tagProps}
                onClose={() =>
                  setState({
                    keyword: ''
                  })
                }
              >
                {state.keyword}
              </Tag>
            )}
          </Col>
          {Object.keys(state.singleParams).map(key => {
            const item = state.singleParams[key];
            return item ? (
              <Col className="mg-b1x" key={key}>
                <Tag
                  color="#61CCFD"
                  {...tagProps}
                  onClose={() =>
                    props.setFilterParams({
                      [key]: { value: undefined, type: FilterType.Single }
                    })
                  }
                >
                  {item.title} ： {item.label}
                </Tag>
              </Col>
            ) : null;
          })}
          {Object.keys(state.dateParams).map(key => {
            const item = state.dateParams[key];
            return item ? (
              <Col className="mg-b1x" key={key}>
                <Tag
                  color="#61CCFD"
                  {...tagProps}
                  onClose={() =>
                    props.setFilterParams({
                      [key]: { value: undefined, type: FilterType.Date }
                    })
                  }
                >
                  {item.title}: {moment(item.value[0]).format(format)} 至{' '}
                  {moment(item.value[1]).format(format)}
                </Tag>
              </Col>
            ) : null;
          })}
          {Object.keys(state.multipleParams).map(key => {
            const item = state.multipleParams[key];
            return item && item.value && item.value.length
              ? item.value.map(item2 => (
                  <Col className="mg-b1x" key={item2.value}>
                    <Tag
                      color="#61CCFD"
                      {...tagProps}
                      onClose={() =>
                        handleClearMultiple(item2, key, item.title)
                      }
                    >
                      {item.title}: {item2.label}
                    </Tag>
                  </Col>
                ))
              : null;
          })}
        </Row>
      </Col>
    </Fragment>
  );
};

export default FilterTag;
