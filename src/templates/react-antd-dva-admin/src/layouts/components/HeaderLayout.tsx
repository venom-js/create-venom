/**
 * @name Header布局
 */
import React, { Fragment } from 'react';
import { Layout, Icon, Avatar, Button, Popover, Breadcrumb } from 'antd';
import Link from 'umi/link';
import { connect } from 'dva';
import DvaComponent from 'src/components/basic-component/DvaComponent';
import { AppModelState } from 'src/models/app';
import styles from '../index.less';
import defaultTheme from '../theme';
const { Header } = Layout;

interface HeaderLayoutProps extends AppModelState {
  collapsed?: boolean;
}

@connect(({ app }) => ({
  ...app
}))
export default class HeaderLayout extends DvaComponent<HeaderLayoutProps> {
  namespace = 'app';
  render() {
    const { collapsed, breadCrumbs } = this.props;
    const content = (
      <Fragment>
        <Button className="" disabled>
          <Link to="/login">
            <Icon type="logout" />
            登出
          </Link>
        </Button>
      </Fragment>
    );
    return (
      <Header style={{ justifyContent: 'space-between' }} className="flex">
        <Fragment>
          <Icon
            className={styles.trigger}
            style={{
              left: `${
                collapsed
                  ? `${defaultTheme.headerHeight}px`
                  : `${defaultTheme.siderWidth}px`
              }`
            }}
            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={() =>
              this.updateState({
                collapsed: !collapsed
              })
            }
          />
          <Breadcrumb style={{ lineHeight: `${defaultTheme.headerHeight}px` }} separator=" / ">
            {breadCrumbs.map(item => (
              <Breadcrumb.Item key={item.path}>
                {item.type === 'Item' ? (
                  <Link to={item.path}>
                    <span>{item.title}</span>
                  </Link>
                ) : (
                  <Fragment>
                    <span>{item.title}</span>
                  </Fragment>
                )}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </Fragment>
        <Popover
          content={content}
          placement="topLeft"
          title="管理员权限"
          trigger="click"
          arrowPointAtCenter
        >
          <span className="pointer">
            管理员
            <Avatar
              src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
              style={{ marginLeft: 8 }}
            />
          </span>
        </Popover>
      </Header>
    );
  }
}
