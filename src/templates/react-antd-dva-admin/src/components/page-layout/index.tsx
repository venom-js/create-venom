/**
 * @name 全局路由页组件
 * @author MingShined
 */
import React from 'react';
import { Affix } from 'antd';
import styles from './index.less';
import FooterLayout from 'src/layouts/components/FooterLayout';
import { AppModelState } from 'src/models/app';

interface PageLayoutProps extends AppModelState {
  extra?: React.ReactNode | any;
  title?: string | any;
}

const PageLayout: React.FC<PageLayoutProps> = props => {
  const { children, extra, title } = props;
  return (
    <div className="pd-2x h-100p">
      <Affix
        offsetTop={0}
        target={() => document.getElementById('contentLayout')}
      >
        <div className={styles.pageLayout}>
          <h1 className="ft-24 mg-b0">{title}</h1>
          <div>{extra}</div>
        </div>
      </Affix>
      <div
        style={{
          minHeight: 'calc(100vh - 216px)'
        }}
        className="of-x-hd ofy-at pd-t2x"
      >
        {children}
      </div>
      <FooterLayout />
    </div>
  );
};

export default PageLayout;
