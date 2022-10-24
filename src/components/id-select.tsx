import { Select } from "antd";
import React from "react";
import { Raw } from "../types";

type SelectProprs = React.ComponentProps<typeof Select>;
 
export interface IdSelectProps extends Omit<SelectProprs, 'value' | 'onChange' | 'defaultOptionName' | 'options'> {
  value: Raw | null | undefined; // select组件上的value
  onChange: (value?: number) => void; // onChange事件 只会回调number和undefined类型
  defaultOptionName?: string; // 默认的选项 
  options?: {name: string; personId: number}[]; // 选项 
};

/**
 * 当isNaN(Number(value))为true时， 代表选择默认类型
 * 当选择默认类型时，onChange回调undefined
 * @param props 
 * @returns 
 */

export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
    {...restProps}
    value={toNumber(value)} 
    onChange={value => onChange(toNumber(value) || undefined)}>
      {
        defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null
      }
      {
        options?.map((option) => <Select.Option key={option.personId} value={option.personId}>{option.name}</Select.Option>)
      }
    </Select>
  )
};

const toNumber = (val: unknown) => {
  if (isNaN(Number(val))) { // 不能转换成数字 返回0
    return 0;
  } else {
    return Number(val);
  }
};
