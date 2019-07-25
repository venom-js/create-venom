/**
 * @name 主入口
 */
import React from 'react';
import BasicLayout from 'src/layouts/BasicLayout';
import { LocaleProvider, ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import LoginPage from 'src/pages/user/loginPage';
import BasciComponent from 'src/components/basic-component';
import withRouter from 'umi/withRouter';
moment.locale('zh-cn');

declare var window: any;

class MainLayout extends BasciComponent {
  componentDidMount() {
    const pathname: string | any = this.props.location.pathname;
    this.handleDispatch({
      type: 'app/filterBreadCrumbs',
      payload: pathname
    });
    this.handleDispatch({
      type: 'common/queryBrandList'
    });
  }
  componentWillReceiveProps(nextProps) {
    this.handleDispatch({
      type: 'app/filterBreadCrumbs',
      payload: nextProps.location.pathname
    });
  }
  handleDispatch(payload) {
    window.g_app._store.dispatch(payload);
  }
  render() {
    const { children, location } = this.props;
    let layout = null;
    if (location.pathname === '/login') {
      layout = <LoginPage />;
    } else {
      layout = <BasicLayout location={location} children={children} />;
    }
    return (
      <ConfigProvider
        getPopupContainer={() => document.getElementById('contentLayout')}
      >
        <LocaleProvider locale={zh_CN}>{layout}</LocaleProvider>
      </ConfigProvider>
    );
  }
}

export default withRouter(MainLayout);
