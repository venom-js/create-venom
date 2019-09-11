/**
 * @name
 * @author MingShined
 */
import React from 'react';
import { MenuBean, MenuType } from 'src/common/menu/type';

import { Menu, Icon } from 'antd';
import Link from 'umi/link';
import menuList from 'src/common/menu';

const SubMenu = Menu.SubMenu;

const renderMenuNode = (): React.ReactNode => {
  const renderMenuItem = (menusData: MenuBean[]): React.ReactNode => {
    if (!menusData) {
      return [];
    }
    return menusData.map((item: MenuBean) => {
      let view = null;
      switch (item.type) {
        case MenuType.SubMenu:
          view = (
            <SubMenu title={<MenuTitle menuItem={item} />} key={item.path}>
              {renderMenuItem(item.children)}
            </SubMenu>
          );
          break;
        case MenuType.ItemGroup:
          view = (
            <Menu.ItemGroup
              title={<MenuTitle menuItem={item} />}
              key={item.path}
            >
              {renderMenuItem(item.children)}
            </Menu.ItemGroup>
          );
          break;
        case MenuType.Item:
          view = (
            <Menu.Item key={item.path}>
              <Link to={item.path}>{<MenuTitle menuItem={item} />}</Link>
            </Menu.Item>
          );
          break;
        case MenuType.Url:
          view = (
            <Menu.Item key={item.path}>
              <a href={item.path} target="_blank">
                {<MenuTitle menuItem={item} />}
              </a>
            </Menu.Item>
          );
          break;
        default:
          view = null;
          break;
      }
      return view;
    });
  };
  return renderMenuItem(menuList);
};
export default renderMenuNode;

const IconNode: React.FC<{ icon: string }> = ({ icon }) => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={icon} alt="icon" />;
  }
  if (typeof icon === 'string') {
    return <Icon type={icon} />;
  }
  return icon;
};

const MenuTitle: React.FC<any> = ({ menuItem }) => {
  return menuItem.icon ? (
    <span>
      <IconNode icon={menuItem.icon} />
      <span>{menuItem.title}</span>
    </span>
  ) : (
    menuItem.title
  );
};
