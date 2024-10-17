import styled from '@emotion/styled';

export const SwitchWrapper = styled.div`
  display: inline-flex;
  align-items: center;
`;

export const SwitchLabel = styled.div`
  color: #4d4d4d;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.03rem;
  padding-right: 0.12rem;
`;

export const SwitchContainer = styled.div`
  position: relative;
`;

export const Switch = styled.div`
  transition: all 0.3s;
  width: 1.69131rem;
  height: 1rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  background: ${props => (props.active ? '#EF831F' : '#4D4D4D')};
`;

export const SwitchCircle = styled.div`
  transition: all 0.3s;
  width: calc(1.69131rem - 15px);
  height: 0.75rem;
  flex-shrink: 0;
  background: #fff;
  position: absolute;
  top: 2px;
  left: 2px;
  border-radius: 50%;
  transform: ${props => (props.active ? 'translateX(0.65rem)' : '')};
`;
