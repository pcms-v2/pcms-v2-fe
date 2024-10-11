import styled from '@emotion/styled';

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const FilterLabel = styled.label`
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
`;

export const FilterButton = styled.button`
  width: 126px;
  height: 34px;
  flex-shrink: 0;
  border-radius: 17px;
  border: 2px solid ${props => (props.isActive ? '#EF831F' : '#F4F4F4')};
  background: #fff;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
  color: ${props => (props.isActive ? '#EF831F' : '#4d4d4d')};
  cursor: pointer;
`;
