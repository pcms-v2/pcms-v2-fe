import styled from '@emotion/styled';

export const LabelInputWrapper = styled.div`
  display: ${props => (props.display ? props.display : 'inline')};
  width: 100%;
  gap: 9px;
`;

export const Typography = styled.div`
  width: ${props => (props.type === 'modalContent' ? '71px' : '120px')};
  display: flex;
  justify-content: ${props =>
    props.type === 'modalContent' ? 'center' : 'flex-start'};
  padding-top: 6px;
  color: #4d4d4d;
  leading-trim: both;
  text-edge: cap;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.03rem;
  margin-bottom: 12px;
  width: ${props => props.width};
`;

export const InputWrapper = styled.div`
  display: flex;
  max-width: ${props => (props.type === 'modalContent' ? '300px' : '376px')};
  width: ${props => (props.type === 'modalContent' ? '350px' : '376px')};
  margin-bottom: 1.25rem;
`;

export const Input = styled.input`
  width: ${props => (props.type === 'modalContent' ? '350px' : '376px')};
  box-sizing: border-box;
  // height: 2.125rem;
  min-height: 2.125rem;
  padding-left: 0.61rem;
  border-radius: 0.5rem;
  border: 1px solid #d5d5d5;
  background: #fff;
  color: #4d4d4d;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.03rem;
  &::placeholder {
    color: #b5b5b5;
  }
  &:disabled {
    background: #f4f4f4;
  }
  white-space: pre-wrap;
  word-wrap: break-word;
`;

export const ValidationText = styled.span`
  align-self: center;
  margin-left: -40px;
  color: ${props => (props.validation === 'required' ? '#FB370C' : '#868686')};
  leading-trim: both;
  text-edge: cap;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.03rem;
`;

export const IconWrapper = styled.div`
  align-self: center;
  margin-left: -10px;
  position: relative;
  right: 10px;
`;

export const TextArea = styled.textarea`
  resize: none;
  width: 100%;
  min-height: 34px;
  max-height: 68px;
  padding: 0.61rem;
  border-radius: 0.5rem;
  border: 1px solid #d5d5d5;
  background: #fff;
  color: #4d4d4d;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.03rem;
  &::placeholder {
    color: #b5b5b5;
  }
  &:disabled {
    background: #f4f4f4;
  }
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
  // height: ${props => (props.rows === 2 ? '68px' : '34px')};
`;
