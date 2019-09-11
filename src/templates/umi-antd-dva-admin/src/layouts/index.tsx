/**
 * @name 主入口
 */
import React from 'react';
import HeaderLayout from 'src/layouts/HeaderLayout';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import LoginPage from 'src/pages/user/loginPage';
import withRouter from 'umi/withRouter';
import DocumentTitle from 'react-document-title';
import venomBasicConfig from 'src/venom.config';
import SiderLayout from './SiderLayout';
import { Basic } from 'src/types';
moment.locale('zh-cn');

const IndexLayout: React.FC<Basic.BaseProps> = props => {
  const { children, location } = props;
  let layout = null;
  if (location.pathname === '/login') {
    layout = <LoginPage />;
  } else {
    layout =
      venomBasicConfig.layout === 'header' ? (
        <HeaderLayout location={location} children={children} />
      ) : (
        <SiderLayout location={location} children={children} />
      );
  }
  return (
    <DocumentTitle title={venomBasicConfig.title}>
      <LocaleProvider locale={zh_CN}>{layout}</LocaleProvider>
    </DocumentTitle>
  );
};

export default withRouter(IndexLayout);
