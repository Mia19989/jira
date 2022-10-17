import React from "react";
// 错误边界处理

// 降级后的UI 超出错误边界时的UI
type FullbackRender = (props: {error: Error | null}) => React.ReactElement
export class ErrorBoundary extends React.Component<React.PropsWithChildren<{fullbackRender: FullbackRender}>, {error: Error | null}> {
  state = {error: null}

  // 子组件抛出异常时 会接收调用
  static getDerivedStateFromError(error: Error) {
    // 更新state
    return {error}
  }

  render() {
    const {error} = this.state;
    const {fullbackRender, children} = this.props

    // 有错误 显示降级UI
    if (error) {
      return fullbackRender({error})
    } else {
      return children
    }
  }
}