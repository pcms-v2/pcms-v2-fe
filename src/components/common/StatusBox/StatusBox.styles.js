import styled from '@emotion/styled';

export const StatusContainer = styled.div`
  display: inline-flex;
  align-items: center;
  height: 2.125rem;
  flex-shrink: 0;
  padding-left: 0.69rem;
  padding-right: 0.69rem;
  border-radius: 0.5rem;
  border: 1px solid #d8d8d8;
  background: #fff;
`;

export const StatusTitle = styled.div`
  color: #ef831f;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.03rem;
`;

export const Divider = styled.div`
  width: 0.125rem;
  height: 1rem;
  flex-shrink: 0;
  background: #ef831f;
  border: none;
  margin-left: 0.63rem;
  margin-right: 0.63rem;
`;

export const StatusValue = styled.div`
  color: #4d4d4d;
  leading-trim: both;
  text-edge: cap;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.03rem;
`;
