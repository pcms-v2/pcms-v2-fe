import styled from '@emotion/styled';

export const SelectWrapper = styled.div`
  display: inline-flex;
  flex-wrap: nowrap;
  align-items: center;
  width: 100%;
  padding: 0 10px;
`;

export const SelectContainer = styled.div`
  position: relative;
  flex: 1;
`;

export const SelectHeader = styled.div`
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 34px;
  flex-shrink: 0;
  border-radius: 17px;
  background: #fff;
  box-shadow: ${props =>
    props.isOpen
      ? '4px 0 8px -4px rgba(0, 0, 0, 0.1), -4px 0 8px -4px rgba(0, 0, 0, 0.1)'
      : '0px 0px 8px 0px rgba(0, 0, 0, 0.1)'};
  text-align: center;
  position: relative;
  color: ${props => (props.selectText === '' ? '#B5B5B5' : '#4d4d4d')};
  font-family: Pretendard;
  leading-trim: both;
  text-edge: cap;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.48px;
`;

export const OptionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  border-radius: 17px;
  list-style-type: none;
  padding: 0;
  margin: 0;
  // max-height: 200px;
  // overflow-y: auto;
  z-index: 1;
  margin-top: 10px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
`;

export const Option = styled.li`
  display: flex;
  align-items: center;
  color: #d8d8d8;
  leading-trim: both;
  text-edge: cap;
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.39px;
  width: 100%;
  height: 34px;
  padding: 0 12px;
  box-sizing: border-box;
  flex-shrink: 0;
  background: #fff;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    color: ${props => (props.disabled ? '#D8D8D8' : '#4D4D4D')};
  }

  &:first-of-type {
    border-radius: 17px 17px 0 0;
  }

  &:last-of-type {
    border-radius: 0 0 17px 17px;
  }
`;

export const ArrowIconWrapper = styled.div`
  position: absolute;
  right: 10px;
`;

export const SelectLabel = styled.label`
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
  padding-right: 9px;
  width: 80px;
`;
