import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const buttonStyles = css`
  height: 34px;
  padding: 5px 20px;
  border: none;
  border-radius: 17px;
  cursor: pointer;
  font-size: 16px;

  color: #fff;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.42px;
`;

export const primary = css`
  width: 151px;
  height: 34px;
  flex-shrink: 0;
  border-radius: 8px;
  background: #1162ff;

  color: #fff;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.48px;

  cursor: default;
`;

export const secondary = css`
  background-color: #6c757d;
  color: white;
`;

export const success = css`
  background-color: #28a745;
  color: white;
`;

export const danger = css`
  background-color: #dc3545;
  color: white;
`;

export const disabled = css`
  width: 151px;
  height: 34px;
  flex-shrink: 0;
  border-radius: 8px;
  background: #e2e2e2;

  color: #4d4d4d;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.48px;

  cursor: default;
`;

export const whiteButton = css`
  color: #4d4d4d;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.48px;

  border-radius: 17px;
  background: #fff;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
  cursor: default;
`;

export const blackButton = css`
  background-color: #3c3c3c;
  color: #212529;
  border: 1px solid #ced4da;
  border-radius: 17px;
  color: white;

  &:hover {
    background: #1b1b1b;
  }

  &:active {
    background: #1b1b1b;
  }
`;

export const Button = styled.button`
  ${buttonStyles}
  ${({ type }) => type === 'primary' && primary}
    ${({ type }) => type === 'secondary' && secondary}
    ${({ type }) => type === 'success' && success}
    ${({ type }) => type === 'danger' && danger}
    ${({ type }) => type === 'white' && whiteButton}
    ${({ type }) => type === 'black' && blackButton}
    ${({ type }) => type === 'disabled' && disabled}
    ${({ disabled }) => disabled && disabled}
`;

// FilterButton 스타일 정의
export const FilterButtonStyles = css`
  width: 126px;
  height: 34px;
  flex-shrink: 0;
  border-radius: 17px;
  background: #fff;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);

  color: #4d4d4d;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.48px;
`;

export const activeButton = css`
  border: 2px solid #ef831f;
`;

export const inactiveButton = css`
  border: 2px solid #f4f4f4;
`;

export const FilterButton = styled.button`
  ${FilterButtonStyles}
  ${({ isActive }) => (isActive ? activeButton : inactiveButton)}
`;
