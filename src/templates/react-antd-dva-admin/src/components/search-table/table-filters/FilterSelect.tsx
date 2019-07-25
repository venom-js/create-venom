import React from 'react';
import { CommonSelect } from 'racc';

interface DataSourceType {
  label: string;
  value: number | string;
}

export interface FilterValueProps {
  label: string;
  value: string;
  title: string;
}

interface FilterSelectProps {
  dataSource?: DataSourceType[] | Object | any;
  onRender?: (item: any, index: number) => React.ReactNode;
  title: string;
  onChange?: (value: FilterValueProps) => void;
  value?: FilterValueProps | any;
  open: boolean;
}

const FilterSelect: React.FC<FilterSelectProps> = props => {
  const handleChange = value => {
    const result = value ? { ...value, title: props.title } : undefined;
    props.onChange(result);
  };
  return (
    <CommonSelect
      open={props.open}
      showSearch
      optionFilterProp="children"
      style={{ width: '100%' }}
      labelInValue={true}
      dataSource={props.dataSource}
      onRender={props.onRender}
      onChange={handleChange}
      value={props.value}
    />
  );
};

export default FilterSelect;
