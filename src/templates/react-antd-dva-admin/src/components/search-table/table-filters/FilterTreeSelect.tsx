import React, { useRef } from 'react';
import { TreeSelect } from 'antd';
import { TreeSelectProps, TreeNode } from 'antd/lib/tree-select';

const SHOW_PARENT = TreeSelect.SHOW_PARENT;

interface DataSourceType {
  label: string;
  value: number | string;
}

interface FilterTreeSelectProps {
  value: DataSourceType[] | any;
  title: string;
  onChange: (value: any) => any;
  dataSource: TreeNode[];
  open: boolean;
}

const FilterTreeSelect: React.FC<FilterTreeSelectProps> = props => {
  const handleChange = value => {
    const result =
      value && value.length ? { value, title: props.title } : undefined;
    props.onChange(result);
  };
  const treeProps: TreeSelectProps = {
    treeData: props.dataSource,
    labelInValue: true,
    value: props.value,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    searchPlaceholder: '请选择',
    style: {
      width: 300
    }
  };
  return (
    <TreeSelect
      open={props.open}
      dropdownStyle={{ maxHeight: 350, overflow: 'auto' }}
      treeNodeFilterProp="title"
      treeDefaultExpandAll={true}
      {...treeProps}
      onChange={handleChange}
    />
  );
};

export default FilterTreeSelect;
