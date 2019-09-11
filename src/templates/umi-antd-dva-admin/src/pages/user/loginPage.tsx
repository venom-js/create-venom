import React, { Fragment } from 'react';
import { connect } from 'dva';
import DvaComponent from 'src/components/basic-component/DvaComponent';
import { CommonForm } from 'racc';
import { FormDataType } from 'racc/dist/common-form/type';
import { Input, Card, Icon, message } from 'antd';
import styles from './indexPage.less';
interface Props {}
const state = {};
type State = Partial<typeof state>;
const getFormData = (that: Login): FormDataType[] => {
  return [
    {
      key: 'name',
      label: '',
      options: {
        rules: [
          {
            required: true,
            message: '请输入用户名'
          }
        ]
      },
      node: (
        <Input
          prefix={<Icon type="user" className={styles.prefixIcon} />}
          placeholder="请输入用户名"
        />
      )
    },
    {
      key: 'password',
      label: '',
      options: {
        rules: [
          {
            required: true,
            message: '请输入密码'
          }
        ]
      },
      node: (
        <Input
          prefix={<Icon type="lock" className={styles.prefixIcon} />}
          placeholder="请输入密码"
          type="password"
        />
      )
    }
  ];
};

@connect()
export default class Login extends DvaComponent<Props, State> {
  namespace = 'user';
  state = state;

  handleSubmit = async (err, value) => {
    // console.log('value', value);
    if (err) {
      return;
    }
    this.handleDispatch('login', value);
  };

  render() {
    return (
      <div className={styles.main}>
        <Card className={styles.login}>
          <CommonForm
            formData={getFormData(this)}
            rowNum={1}
            onSubmit={this.handleSubmit}
            btnProps={{
              isResetBtn: false,
              isSubmitBtn: true,
              submitText: '登录'
            }}
          />
        </Card>
      </div>
    );
  }
}
