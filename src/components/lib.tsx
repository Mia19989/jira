import styled from "@emotion/styled"

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