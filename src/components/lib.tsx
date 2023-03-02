import styled from "@emotion/styled"
import { Button, Spin, Typography } from "antd";

export const Row = styled.div<{
  marginRight?: number | boolean;
  spaceBetween?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  justify-content: ${props => props.spaceBetween ? 'space-between' : undefined};
  align-items: center;
  margin-bottom: ${props => props.marginBottom + 'rem'};
  /* 清除直接子代中的margin-top margin-bottom 避免影响aligin-items:center */
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    /* 判断props中是否有marginRight */
    margin-right: ${props => typeof props.marginRight === 'number' ? props.marginRight + 'rem' 
      : props.marginRight ? '2rem' : undefined};
  }
`

const FullPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export const FullPageLoading = () => {
  return (
    <FullPage>
      <Spin size="large" />
    </FullPage>
  )
}

export const FullPageError = ({error}: {error: Error | null}) => {
  return (
    <FullPage>
      <ErrorBox error={error} />
    </FullPage>
  )
}

export const ButtonNoPadding = styled(Button)`
  padding: 0;
`

// 类型守卫 判断符合条件val.message -> 是Error类型
/** 判断是不是Error类型 */
const isError = (val: any): val is Error => val.message;

export const ErrorBox = (error: {error: unknown}) => {
  if (isError(error))
    return <Typography.Text type="danger">{error?.message}</Typography.Text>
  return null;
}