import styled from '@emotion/styled';

export const BackgroundContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: #f5f7fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoginContainer = styled.div`
  width: 323px;
`;

export const ImageContainer = styled.div`
  width: 515.419px;
  height: 220px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const MainTitle = styled.h1`
  color: #4d4d4d;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.54px;
  margin-top: 47px;
  margin-bottom: 30px;
`;

export const SubTitle = styled.h2`
  color: #4d4d4d;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.42px;
  word-break: keep-all;
  margin-bottom: 20px;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  input {
    width: 323px;
    height: 38px;
    flex-shrink: 0;
    border-radius: 20px;
    background: #fff;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
    padding: 10px 14px;
    box-sizing: border-box;

    color: #000000; /* Input value text color */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.42px;

    &::placeholder {
      color: #b5b5b5; /* Placeholder text color */
    }
  }

  input:first-of-type {
    margin-bottom: 14px;
  }

  button {
    margin-top: 30px;
    width: 323px;
    height: 38px;
    flex-shrink: 0;
    border-radius: 17px;
    background: #3c3c3c;

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
  }
`;

export const ModalContainer = styled.div``;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalWrapper = styled.div`
  width: 416px;
  height: 192px;
  flex-shrink: 0;

  border-radius: 10px;
  border: 1px solid #d5d5d5;
  background: #fff;
`;

export const ErrText = styled.div`
  display: flex;
  margin: 50px auto;
  flex-direction: column;
  & > p {
    color: #4d4d4d;
    text-align: center;
    leading-trim: both;
    text-edge: cap;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.48px;
  }
  & > h1 {
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
  }
`;

export const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
`;

export const ExplanWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3px;
  margin-bottom: 33px;

  & > p {
    color: #4d4d4d;
    leading-trim: both;
    text-edge: cap;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.48px;
  }
`;
