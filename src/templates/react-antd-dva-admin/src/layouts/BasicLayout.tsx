/**
 * @name 基础布局Layout
 * @author MingShined
 */
import React, { Component } from 'react';
import { Basic } from 'src/types';
import SiderLayout from './components/SiderLayout';
import { Layout } from 'antd';
import HeaderLayout from './components/HeaderLayout';
import ContentLayout from './components/ContentLayout';

interface Props extends Basic.BaseProps {}

export default class BasicLayout extends Component<Props> {
  render() {
    const { children } = this.props;
    return (
      <Layout className="flex flex-1 h-100p">
        <SiderLayout />
        <Layout className="flex h-100p">
          <HeaderLayout />
          <ContentLayout children={children} />
        </Layout>
      </Layout>
    );
  }
}
