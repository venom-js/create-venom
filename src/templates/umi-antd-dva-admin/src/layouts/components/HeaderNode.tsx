/**
 * @name Header布局
 */
import React, { Fragment } from 'react';
import { Layout } from 'antd';
import styles from '../index.less';
import venomBasicConfig from 'src/venom.config';
import HeaderMenu from './HeaderMenu';
import TitleNode from './TitleNode';
const { Header } = Layout;

const HeaderNode: React.FC = props => {
  return (
    <Header
      style={{
        height: `${venomBasicConfig.headerHeight}px`,
        background:
          (venomBasicConfig.layout === 'sider' && venomBasicConfig.headerBg) ||
          venomBasicConfig.theme === 'light'
            ? '#fff'
            : '#001529',
        color: venomBasicConfig.headerColor || '#1890ff',
        position: venomBasicConfig.fixHeader ? 'fixed' : 'static'
      }}
      className={`${styles.header}`}
    >
      {venomBasicConfig.layout === 'header' &&
      venomBasicConfig.contentWidthMode === 'fixed' ? (
        <div className={styles.wrap}>
          <HeaderChildren />
        </div>
      ) : (
        <HeaderChildren />
      )}
    </Header>
  );
};

export default HeaderNode;

const HeaderChildren: React.FC = props => (
  <Fragment>
    {venomBasicConfig.layout === 'header' || venomBasicConfig.fixHeader ? (
      <TitleNode />
    ) : (
      <div />
    )}
    {venomBasicConfig.layout === 'header' && <HeaderMenu />}
    <div className={styles.headerExtra}>Header</div>
  </Fragment>
);
