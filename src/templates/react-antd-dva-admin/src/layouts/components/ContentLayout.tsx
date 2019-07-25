/**
 * @name 主体main
 */
import React from 'react';
import { Layout } from 'antd';
import defaultTheme from '../theme';
const { Content } = Layout;

const ContentLayout: React.FC = props => {
  return (
    <div
      style={{
        flexDirection: 'column',
        height: `calc(100% - ${defaultTheme.headerHeight}px)`
      }}
      className="flex flex-1 of-x-hd of-y-at"
      id="contentLayout"
    >
      <Content className="flex" style={{ flexDirection: 'column' }}>
        {props.children}
      </Content>
    </div>
  );
};

export default ContentLayout;
