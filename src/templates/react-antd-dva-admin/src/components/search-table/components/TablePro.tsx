/**
 * @name 通用表格
 * @author MingShined
 */
import React, { Fragment, useContext } from 'react';
import { Table, Pagination, Row, Col, Icon } from 'antd';
import { SearchTableContext } from '../reducer';

const TablePro: React.FC = ({ children }) => {
  const { props, state, setState } = useContext(SearchTableContext);
  const rowSelection = props.checkable && {
    selectedRowKeys: state.checkedkeys,
    onChange: (selectedRowKeys, rowSelectProps) => {
      const visible = !selectedRowKeys.length;
      setState({
        visible,
        checkedkeys: selectedRowKeys
      });
    }
  };
  const handleChangePage = (page: number, size: number) =>
    setState({
      pageProps: { ...state.pageProps, current: page - 1, pageSize: size }
    });
  const { total, pageSize, current } = state.pageProps;
  return (
    <Fragment>
      <Table
        rowKey={(row, index) => index.toString()}
        pagination={false}
        {...props.tableProps}
        loading={state.loading}
        rowSelection={rowSelection}
      >
        {children}
      </Table>
      <Row type="flex" justify="space-between" className="mg-t2x">
        <Col style={{ color: '#9397A3' }}>
          <span>共{total}条记录</span>
          <span className="mg-l1x">
            第{current + 1}/{Math.ceil(total / (pageSize || 10))}页
          </span>
        </Col>
        <Col>
          <Pagination
            {...state.pageProps}
            current={current + 1}
            onChange={handleChangePage}
            onShowSizeChange={handleChangePage}
            showQuickJumper
            showSizeChanger
            itemRender={(page, type, originalElement) => {
              if (type === 'prev') {
                return (
                  <a href="javascript:;" className="bd-none">
                    <Icon type="left" />
                  </a>
                );
              }
              if (type === 'next') {
                return (
                  <a href="javascript:;" className="bd-none">
                    <Icon type="right" />
                  </a>
                );
              }
              return originalElement;
            }}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default TablePro;
