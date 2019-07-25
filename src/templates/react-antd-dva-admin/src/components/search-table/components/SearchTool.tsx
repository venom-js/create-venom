import React, { useContext } from 'react';
import { Row, Col, Input, Icon, Button } from 'antd';
import styles from '../index.less';
import { SearchTableContext } from '../reducer';

const SearchTool: React.FC = () => {
  const { props, state, setState } = useContext(SearchTableContext);
  let inputEl = null;
  const handleSearch = () => {
    setState({ keyword: inputEl.state.value }, () => {
      inputEl.state.value = '';
    });
  };
  return (
    <Row type="flex" align="middle" justify="space-between">
      <Col>
        <h1 className="ft-18">{props.title}</h1>
        <p style={{ color: '#9397A3' }}>{props.description}</p>
      </Col>
      <Col className="flex" style={{ alignItems: 'center' }}>
        <Input
          ref={el => (inputEl = el)}
          onPressEnter={handleSearch}
          prefix={<Icon style={{ color: '#9397A3' }} type="search" />}
          suffix={
            <Button
              type="primary"
              className={styles.search}
              onClick={handleSearch}
            >
              搜索
            </Button>
          }
          className={styles.input}
          placeholder={props.placeholder}
          allowClear
        />
        {props.searchAction && (
          <div className="mg-l4x">{props.searchAction}</div>
        )}
      </Col>
    </Row>
  );
};

export default SearchTool;
