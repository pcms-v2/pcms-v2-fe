import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from '@emotion/styled';

export const DateBox = styled.div`
  display: flex;
  gap: 26px;
  flex-direction: row;
`;

export const DateContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const DateTitle = styled.label`
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

export const DateInput = styled(DatePicker)`
  width: 110px;
  height: 34px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #d5d5d5;
  background: #fff;

  margin: 0 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  align-items: center;

  .react-datepicker-wrapper {
    width: 100%;
  }
  .react-datepicker__input-container {
    display: flex;
    align-items: center;
  }
  input {
    border: none;
    outline: none;
    width: 76px;
  }
`;

export const CustomDateInput = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #d5d5d5;
  border-radius: 8px;
  padding: 5px;
  background: #fff;
  cursor: pointer;
  width: 110px;
  height: 34px;
  margin: 0 10px;

  input {
    border: none;
    outline: none;
    width: 80px;
    text-align: center;
    background: transparent;
    box-sizing: border-box;
  }

  svg {
    color: orange;
  }

  * {
    cursor: pointer;
  }
`;
