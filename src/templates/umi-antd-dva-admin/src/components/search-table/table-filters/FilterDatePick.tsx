import React from 'react';
import { DatePick } from 'racc';
import { DatePickProps } from 'racc/dist/date-pick/type';

interface FilterDatePickProps {
  datePickProps?: DatePickProps;
  onChange?: (value: any) => void;
  value?: any;
  title: string;
  open: boolean;
  setOpen: any;
}

const FilterDatePick: React.FC<FilterDatePickProps> = props => {
  const handleChange = value => {
    const result =
      value && value.length ? { value, title: props.title } : undefined;
    props.onChange(result);
  };
  return (
    <DatePick
      rangePickerProps={{
        open: props.open,
        onOk: () => props.setOpen(false)
      }}
      type="range"
      value={props.value}
      onChange={handleChange}
      {...props.datePickProps}
    />
  );
};

export default FilterDatePick;
