/**
 * @name 菜单栏
 */
import React from 'react';
import { Menu } from 'antd';
import { connect } from 'dva';
import { AppModelState } from 'src/models/app';
import styles from '../index.less';
import venomBasicConfig from 'src/venom.config';
import renderMenuNode from './MenuNode';

const HeaderMenu: React.FC<AppModelState> = props => {
  const { breadCrumbs } = props;
  const keys = breadCrumbs.map(item => item.path);
  return (
    <Menu
      theme={venomBasicConfig.theme}
      mode="horizontal"
      className={`flex h-100p flex-1 of-x-at ${styles.menu}`}
      style={{ lineHeight: `${venomBasicConfig.headerHeight}px` }}
      selectedKeys={keys}
    >
      {renderMenuNode()}
    </Menu>
  );
};

export default connect(({ app }) => ({ ...app }))(HeaderMenu);
