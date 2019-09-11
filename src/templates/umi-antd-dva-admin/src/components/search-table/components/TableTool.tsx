import React, { useContext } from 'react';
import { Icon, Card, Divider } from 'antd';
import { SearchTableContext } from '../reducer';

const TableTool: React.FC = () => {
  const { props, state, setState } = useContext(SearchTableContext);
  const { total, pageSize, current } = state.pageProps;
  return (
    <Card
      style={{ backgroundColor: '#40475D' }}
      bodyStyle={{ padding: '17px 22px' }}
      className="ft-white"
    >
      <span>已选 {state.checkedkeys.length} 条</span>
      <span style={{ marginLeft: 17 }}>共 {total} 条</span>
      <Divider className="mg-l3x mg-r3x" type="vertical" />
      <a
        href="javascirpt:;"
        className="ft-white"
        style={{ marginRight: 72 }}
        onClick={() =>
          setState({
            checkedkeys: []
          })
        }
      >
        清空
      </a>
      <span style={{ marginLeft: 106 }}>{props.tableAciton}</span>
      <Icon
        type="close"
        onClick={() =>
          setState({
            visible: true,
            checkedkeys: []
          })
        }
        className="flt-rt pointer"
        style={{ fontSize: 22, marginTop: 5 }}
      />
    </Card>
  );
};

export default TableTool;
