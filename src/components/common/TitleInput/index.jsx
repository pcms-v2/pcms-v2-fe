import styled from 'styled-components';

export default function TitleInput({ title, name, onChange }) {
  return (
    <TitleInputWrapper>
      <Title>{title}</Title>
      <Input onChange={onChange} value={name} />
    </TitleInputWrapper>
  );
}

const TitleInputWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
`;

const Title = styled.div`
  flex: 1;
  color: #4d4d4d;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.48px;
`;

const Input = styled.input`
  width: 290px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #d5d5d5;
  background: #fff;
  color: #4d4d4d;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.48px;
  outline: none;
  box-sizing: border-box;
  padding: 13px;

  &:focus {
    border: 1px solid #4d4d4d;
  }
`;
