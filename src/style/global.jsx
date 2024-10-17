import { css } from '@emotion/react';
import emotionReset from 'emotion-reset';

export const globalStyles = css`
  ${emotionReset}

  @font-face {
    font-family: 'Pretendard';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff')
      format('woff');
    font-weight: 400;
    font-style: normal;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  body {
    font-family: 'Pretendard-Regular';
  }

  div {
    box-sizing: border-box;
  }

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    text-align: center;
  }

  option {
    border: none;
  }

  input {
    border: none;
  }
  table {
    width: 100%;
    box-sizing: border-box;
    * {
      text-align: center;
      box-sizing: border-box;
    }
  }
`;
