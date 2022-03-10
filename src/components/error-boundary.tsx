import React, {Component, PropsWithChildren, ReactElement} from "react";

type FallbackRender = (props: { error: Error | null }) => ReactElement

// { children: ReactNode, fallbackRender: FallbackRender }
/**
 * 错误边界捕获 出现页面渲染的错误会渲染一个新的界面提示用户
 */
export default class ErrorBoundary extends Component<PropsWithChildren<{ fallbackRender: FallbackRender }>, { error: Error | null }> {
  state = {
    error: null
  }

  // 当子组件抛出异常时，这里会接收并且调用
  static getDerivedStateFromError(error: Error) {
    return {error}
  }

  render() {
    const {error} = this.state
    const {children, fallbackRender} = this.props;
    /**
     * children表示子组件元素
     * fallbackRender表示出现错误时渲染的界面
     */

    if (error) {
      return fallbackRender({error})
    }

    return children;
  }
}
