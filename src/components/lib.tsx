import styled from '@emotion/styled'
import { Button, Spin, Typography } from 'antd';
import React from 'react';



/**
 * 抽象出一个可以复用的组件通过传入props来设置组件的样式
 * >*表示元素
 * 子元素的margin-right如果传入数字，则将margin-right设为该值
 * 传入布尔值，为真时设置默认值为2rem false时不设置
 */
export const Row = styled.div<{
  gap?: number | boolean,
  between?: boolean,
  marginBottom?: number
}>`
    display: flex;
    align-items: center;
    justify-content: ${props => props.between ? 'space-between' : undefined};
    margin-bottom: ${(props) => props.marginBottom + "rem"};
    >* {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined};
    }
`

export const ErrorBox = ({ error }: { error: unknown }) => {
  // 类型守卫
  const isError = (value: any): value is Error => value?.message;

  if (isError(error)) {
    return <Typography.Text type={"danger"}>{error?.message}</Typography.Text>;
  }

  return null;
};

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;


/**
 * 加载时渲染的页面
 */
export const FullPageLoading = () => (
  <FullPage>
    <Spin size={"large"} />
  </FullPage>
);


/**
 * 出现错误时展现的页面
 */
export const FullPageErrorFallback = ({ error }: { error: Error | null }) => (
  <FullPage>
    <ErrorBox error={error} />
  </FullPage>
);


export const ButtonNoPadding = styled(Button)`
  padding: 0;
`;

export const ScreenContainer = styled.div`
  padding: 3.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;