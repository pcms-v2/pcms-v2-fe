// modal.styles.js
import styled from '@emotion/styled';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalWrapper = styled.div`
  background: white;
  border-radius: 8px;
  max-width: 500px;
  width: 26rem;
  position: relative;
`;

export const Divider = styled.hr`
  width: 100%;
  height: 1px;
  flex-shrink: 0;
  margin: 0px 0px 10px 0px;
  background-color: #d5d5d5;
  border: none;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  height: 72px;
`;

export const ModalTitle = styled.div`
  color: #4d4d4d;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.03375rem;
`;

export const ButtonGroup = styled.div`
  width: 9.25rem;
  display: flex;
  justify-content: space-between;
`;

export const ModalContent = styled.div`
  padding: ${props => props.paddingSize};
`;

export const WarningText = styled.div`
  color: #f00;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.48px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const ErrText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 41px;
  flex-shrink: 0;
  background: #f7f7f7;
  color: #f00;
  leading-trim: both;
  text-edge: cap;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.48px;
  margin-bottom: 30px;
`;
