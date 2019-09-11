import { FilterType } from './enum';
import { TableProps } from 'antd/lib/table';

interface AjxaProps {
  method: 'GET' | 'POST';
  url: string;
}

export interface FilterValueProps {
  label: string;
  value: string;
  title: string;
}

interface FilterParamsProps {
  value: FilterValueProps | string[] | FilterValueProps[] | any;
  type: FilterType;
  key: string;
}

export interface FilterParams {
  [propName: string]: FilterParamsProps;
}

export interface DateKeysProps {
  [propName: string]: string[];
}

export interface SearchTableProps<T = any> {
  tableProps: TableProps<T>;
  ajxaProps: AjxaProps;
  title: string;
  filterParams: FilterParams;
  description: string;
  setFilterParams: any;
  onCheck?: (checkedkeys: string[] | number[]) => void;
  placeholder?: string;
  tableAciton?: React.ReactNode;
  searchAction?: React.ReactNode;
  checkable?: boolean;
  dateKeys?: DateKeysProps;
  getSearchParams?: (searchParams: any) => void;
}
