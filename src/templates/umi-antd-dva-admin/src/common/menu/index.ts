import { MenuType, MenuBean } from 'src/common/menu/type';

const menuList: MenuBean[] = [
  {
    title: '主页',
    path: '/',
    type: MenuType.Item,
    icon: 'home'
  },
  {
    title: 'home',
    path: '/home',
    type: MenuType.SubMenu,
    icon: 'home',
    children: [
      {
        title: 'a',
        path: '/home/a',
        type: MenuType.Item,
        icon: 'home'
      },
      {
        title: 'b',
        path: '/home/b',
        type: MenuType.Item,
        icon: 'home'
      }
    ]
  },
  {
    title: 'home',
    path: '/home1',
    type: MenuType.SubMenu,
    icon: 'home',
    children: [
      {
        title: 'a',
        path: '/home1/a',
        type: MenuType.Item,
        icon: 'home'
      },
      {
        title: 'b',
        path: '/home1/b',
        type: MenuType.Item,
        icon: 'home'
      }
    ]
  }
];

export default menuList;
