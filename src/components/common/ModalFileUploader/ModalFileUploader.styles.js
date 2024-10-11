import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.h3`
  color: #4d4d4d;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.48px;
  position: relative;
  left: 0;
  padding-bottom: 12px;
  width: 100%;
`;

export const FileInputWrapper = styled.div`
  border-radius: 8px;
  border: 1px solid #d5d5d5;
  background: #f8f8f8;
  flex: 1;
`;

export const FileName = styled.p`
  color: #4d4d4d;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.48px;
  padding: 8px 8px 8px 12px;
  width: 270px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const ResultBox = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  text-align: center;
`;

export const WarningText = styled.div`
  color: #f00;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.48px;
`;

export const ResultTitle = styled.div`
  color: #4d4d4d;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.48px;
`;
export const ResultText = styled.div`
  color: #868686;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.48px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 16px;
`;

export const Button = styled.button`
  width: 68px;
  height: 34px;
  background-color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }

  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.48px;
`;

export const DeliveryExcelResult = styled.div`
  padding: 48px 0;
  text-align: center;

  color: #868686;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.48px;
`;

export const ErrorDownLoadBox = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

export const ErrorDownload = styled.p`
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

  ${ErrorDownLoadBox}:hover & {
    color: #ef831f;
  }
`;
