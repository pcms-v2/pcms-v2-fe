import styled from '@emotion/styled';

export const DeleteBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 0.63rem;
  margin-bottom: 0.63rem;
`;

export const Box = styled.div`
  display: inline-flex;
  align-items: center;
  padding-left: 10px;
  margin-left: -10px;
  width: 13rem;
  height: 34px;
  background: #f4f4f4;
  flex-shrink: 0;
  color: ${props => (props.selected ? '#EF831F' : '#4D4D4D')};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.42px;
  border-radius: 8px;
   border: ${props => (props.selected ? '1px solid #EF831F' : 'none')};
  cursor: pointer;
}
`;

export const IconWrapper = styled.div`
  align-self: center;
  margin-left: -20px;
`;
