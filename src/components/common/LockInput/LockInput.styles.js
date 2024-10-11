import styled from '@emotion/styled';

export const LockInputWrapper = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  gap: 11px;
`;

export const LockTitle = styled.label`
  width: 71px;
  color: #4d4d4d;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.48px;
`;

export const LockInput = styled.input`
  flex: 1;
  height: 2.125rem;
  padding-left: 0.61rem;
  border-radius: 8px;
  border: 1px solid #d5d5d5;
  background: #f4f4f4;

  color: #4d4d4d;
  leading-trim: both;
  text-edge: cap;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.48px;
  &::placeholder {
    color: #b5b5b5;
  }
`;

export const LockIconContainer = styled.div`
  position: absolute;
  right: 11px;
  // top: 3px;
  top: 10px;
`;
