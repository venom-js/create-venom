/**
 * @name
 * @author MingShined
 */
import React from 'react';
import styles from '../index.less';
import venomBasicConfig from 'src/venom.config';
import Title from 'antd/lib/typography/Title';
interface Props {}
const TitleNode: React.FC<Props> = props => {
  return (
    <Title
      className={styles.logo}
      style={{
        width:
          venomBasicConfig.theme === 'dark'
            ? venomBasicConfig.siderWidth
            : +venomBasicConfig.siderWidth - 1,
        height: venomBasicConfig.headerHeight,
        marginBottom: 0,
        background: venomBasicConfig.theme === 'dark' ? '#001529' : '#fff',
        color: venomBasicConfig.theme === 'dark' ? '#fff' : '#1890ff',
        boxShadow: venomBasicConfig.theme === 'light' && '1px 1px 0 0 #e8e8e8'
      }}
    >
      Venom
    </Title>
  );
};
export default TitleNode;
