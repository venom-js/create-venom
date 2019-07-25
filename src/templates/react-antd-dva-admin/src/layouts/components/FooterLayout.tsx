/**
 * @name 页脚
 */
import React from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;

const FooterLayout: React.FC = props => {
  return (
    <Footer className="ft-ct">
      <p>Copyright@ {new Date().getFullYear()} 陈先生有酒有故事</p>
    </Footer>
  );
};

export default FooterLayout;
