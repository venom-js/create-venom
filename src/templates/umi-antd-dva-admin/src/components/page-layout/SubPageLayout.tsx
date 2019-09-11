/**
 * @name 全局路由页组件
 * @author MingShined
 */
import React, { Fragment, Component } from 'react';
import { Affix, Breadcrumb } from 'antd';
import styles from './index.less';
import FooterLayout from 'src/layouts/components/FooterNode';
import { AppModelState } from 'src/models/app';
import Link from 'umi/link';
import { connect } from 'dva';

interface SubPageLayoutProps extends AppModelState {
  extra?: React.ReactNode | any;
  title?: string | any;
}

@connect(({ app }) => ({ ...app }))
export default class SubPageLayout extends Component<SubPageLayoutProps> {
  render() {
    const { children, extra, title, breadCrumbs } = this.props;
    return (
      <div className="h-100p">
        <Affix
          offsetTop={64}
          target={() => document.getElementById('contentLayout')}
        >
          <div className={styles.pageLayout}>
            <h1 className="ft-24 mg-b0">{title}</h1>
            <Breadcrumb separator=" / ">
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
            <div>{extra}</div>
          </div>
        </Affix>
        <div className="of-x-hd ofy-at pd-2x pd-t3x">{children}</div>
        <FooterLayout />
      </div>
    );
  }
}
