import React from "react";
import { Rate } from "antd";

interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean; // 是否选中
  onCheckedChange?: (checked: boolean) => void; // 选中后的状态
};

const Pin = (props: PinProps) => {
  const { checked, onCheckedChange, ...restProps } = props;

  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={num => {
        onCheckedChange?.(!!num)}}
      {...restProps}
    />
  )
};

export default Pin;
