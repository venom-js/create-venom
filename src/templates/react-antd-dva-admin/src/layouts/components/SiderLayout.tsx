/**
 * @name 菜单栏
 */
import React from 'react';
import { Layout, Menu, Icon, Row } from 'antd';
import Link from 'umi/link';
import menuData from 'src/common/menu';
import { MenuType, MenuBean } from 'src/common/menu/type';
import { connect } from 'dva';
import { AppModelState } from 'src/models/app';
import DvaComponent from 'src/components/basic-component/DvaComponent';
import defaultTheme from '../theme';
import styles from '../index.less';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

const getIcon = icon => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={icon} alt="icon" />;
  }
  if (typeof icon === 'string') {
    return <Icon type={icon} />;
  }
  return icon;
};

interface Props extends AppModelState {}

@connect(({ app }) => ({
  breadCrumbs: app.breadCrumbs,
  collapsed: app.collapsed
}))
export default class SiderLayout extends DvaComponent<Props> {
  namespace = '';
  state = {
    openKeys: []
  };
  handleResetModel = (menuItem: MenuBean) => {
    if (!menuItem.model) {
      return;
    }
    this.props.dispatch({
      type: `${menuItem.model}/resetState`
    });
  };
  public renderMenuItem = (menusData: MenuBean[]) => {
    if (!menusData) {
      return [];
    }
    function renderTitle(item: MenuBean) {
      return item.icon ? (
        <span>
          {getIcon(item.icon)}
          <span>{item.title}</span>
        </span>
      ) : (
        item.title
      );
    }
    return menusData.map(item => {
      let view = null;
      switch (item.type) {
        case MenuType.SubMenu:
          view = (
            <SubMenu title={renderTitle(item)} key={item.path}>
              {this.renderMenuItem(item.children)}
            </SubMenu>
          );
          break;
        case MenuType.ItemGroup:
          view = (
            <Menu.ItemGroup title={renderTitle(item)} key={item.path}>
              {this.renderMenuItem(item.children)}
            </Menu.ItemGroup>
          );
          break;
        case MenuType.Item:
          view = (
            <Menu.Item
              key={item.path}
              onClick={() => this.handleResetModel(item)}
            >
              <Link to={item.path}>{renderTitle(item)}</Link>
            </Menu.Item>
          );
          break;
        case MenuType.Url:
          view = (
            <Menu.Item key={item.path}>
              <a href={item.path} target="_blank">
                {renderTitle(item)}
              </a>
            </Menu.Item>
          );
          break;
        default:
          view = (
            <Menu.Item key={item.path}>
              <Link to={item.path}>{renderTitle(item)}</Link>
            </Menu.Item>
          );
          break;
      }
      return view;
    });
  };
  render() {
    const { collapsed, breadCrumbs } = this.props;
    const keys = breadCrumbs.map(item => item.path);
    const openKeys = this.state.openKeys;
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={defaultTheme.siderWidth}
        className={`h-100p of-at ${styles.mainSider}`}
      >
        <Row
          className="ft-white ft-20"
          style={{ height: defaultTheme.headerHeight }}
          type="flex"
          justify="center"
          align="middle"
        >
          {collapsed ? '^_^' : 'MingShined'}
        </Row>
        <Menu
          theme="dark"
          mode="inline"
          className="flex-1 of-at"
          selectedKeys={keys}
          openKeys={openKeys.length ? [[...openKeys].pop()] : keys}
          defaultOpenKeys={keys}
          onOpenChange={values => {
            this.setState({
              openKeys: values
            });
          }}
        >
          {this.renderMenuItem(menuData)}
        </Menu>
      </Sider>
    );
  }
}
