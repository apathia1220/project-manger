import React, { ComponentProps } from "react";
import { Rate } from "antd";

interface PinProps extends ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

/**
 * 封装Rate评星标准
 * @param param0 
 */
export const Pin = ({ checked, onCheckedChange, ...restProps }: PinProps) => (
  <Rate
    count={1}
    value={checked ? 1 : 0}
    onChange={(num) => onCheckedChange?.(!!num)}
    {...restProps}
  />
);
