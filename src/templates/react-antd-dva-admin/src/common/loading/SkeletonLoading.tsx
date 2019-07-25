import React from 'react';
import { Skeleton } from 'antd';
import { SkeletonProps } from 'antd/lib/skeleton';

const SkeletonLoading: React.FC = (props: SkeletonProps) => {
  return <Skeleton active={true} {...props} />;
};

export default SkeletonLoading;
