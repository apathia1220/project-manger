import React, { ComponentProps } from 'react'
import { Select } from 'antd'

type SelectProps = ComponentProps<typeof Select>
// 继承原始Select组件中的props类型

interface IdSelectProps
    extends Omit<SelectProps, "value" | "onChange" | "options"> {
    // Omit<SelectProps, "value" | "onChange" | "options">
    // 继承原始组件中除value、onChange、options之外的类型定义
    value?: string | number | null | undefined;
    onChange?: (value?: number) => void;
    defaultOptionName?: string;
    options?: { name: string; id: number }[];
}

/**
 * 二次封装antd的select组件
 * 使得组件可以进一步在传入的value不再是string类型，转变为number类型
 */
/**
 * value 可以传入多种类型的值
 * onChange只会回调 number|underfined 类型
 * 当 isNaN(Number(value)) 为true的时候，代表选择默认类型
 * 当选择默认类型的时候，onChange会回调underfined
 */
export const IdSelect = (props: IdSelectProps) => {
    const { value, onChange, defaultOptionName, options, ...restProps } = props;

    const toNumber = (value: unknown) =>
        isNaN(Number(value)) ? 0 : Number(value);

    return (
        <Select
            value={options?.length ? toNumber(value) : 0}
            // 当options初始化时没有长度，默认的选项值为0
            onChange={(value) => onChange?.(toNumber(value)) || undefined}
            {...restProps}
        >
            {defaultOptionName ? (
                <Select.Option value={0}>{defaultOptionName}</Select.Option>
            ) : null}
            {options?.map((option) => (
                <Select.Option value={option.id} key={option.id}>
                    {option.name}
                </Select.Option>
            ))}
        </Select>
    );
};