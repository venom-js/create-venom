import React from 'react';
interface Props {}
const MainPageLayout: React.FC<Props> = props => {
  return (
    <div
      className="mg-2x"
      style={{
        backgroundColor: '#fff',
        padding: '24px 32px',
        boxShadow: '0px 4px 12px 0px rgba(166,153,190,0.06)'
      }}
    >
      {props.children}
    </div>
  );
};
export default MainPageLayout;
