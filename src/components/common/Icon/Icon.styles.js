/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

// icon은 기본색상 = #EF831F , hover 필요없음
// default은 기본색상 = #4D4D4D , hover 필요없음
// active는 기본색상 = #4D4D4D , hover = #EF831F

export const svgStyle = iconType => css`
  fill: ${iconType === 'icon' ? '#EF831F' : '#4D4D4D'};
  cursor: ${iconType === 'icon' ? 'default' : 'pointer'};
  &:hover path {
    fill: ${iconType === 'active' ? '#EF831F' : ''};
  }
`;
