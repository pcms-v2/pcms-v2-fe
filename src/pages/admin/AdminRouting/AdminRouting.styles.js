import styled from '@emotion/styled';
import { styled as muiStyled } from '@mui/material/styles';
import { Button } from '@mui/material';

export const ViewSize = styled.div`
  margin-right: 0.25rem;
  color: #4d4d4d;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.03rem;
`;

export const DisabledInput = styled.input`
  width: 300px;
  height: 34px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #d5d5d5;
  background: #f4f4f4;
`;

export const SearchWrapper = styled.div`
  display: flex;
  margin-bottom: 32px;
  justify-content: space-between;
`;

export const SubRouteSearchWrapper = styled.div`
  display: flex;
  gap: 14px;
  margin-top: 16px;
  white-space: nowrap;
`;

export const SubRouteInfoBox = styled.div`
  width: 20%;
  height: 728px;
  flex-shrink: 0;
  margin-right: 10px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
`;

export const SubRouteName = styled.div`
  display: inline-flex;
  align-items: center;
  padding-left: 10px;
  margin-left: 10px;
  margin-top: 0.63rem;
  width: 14rem;
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
  cursor: pointer;
  border:  ${props => (props.selected ? '1px solid #EF831F' : 'none')}
}
`;

export const AsignedBox = styled.div`
  gap: 14px;
  width: ${props => (props.type === 'detail' ? '80%' : '36%')};
  height: 728px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #d5d5d5;
  background: #fff;
  white-space: nowrap;
`;

export const NonAsignedBox = styled.div`
  gap: 14px;
  width: 36%;
  height: 728px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #d5d5d5;
  background: #fff;
  white-space: nowrap;
`;

export const SubRouteInfoText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.94rem;
  color: #4d4d4d;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.54px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  gap: 10px;
`;

export const TextWrapper = styled.div`
  display: flex;
  gap: 1.12rem;
  margin-left: 1.5rem;
  margin-top: 0.8rem;
`;

export const SearchInputWraaper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.94rem;
  gap: 5px;
`;

export const CheckAllBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 2.75rem;
  flex-shrink: 0;
  border-top: 1px solid #d5d5d5;
  border-bottom: 1px solid #d5d5d5;
  background: #f7f7f7;
`;

export const AddressText = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-75%);
  color: #4d4d4d;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.03375rem;
  margin-left: 1rem;
`;

export const BootstrapButton = muiStyled(Button)({
  border: 'none',
  backgroundColor: 'transparent',
  '&:hover': {
    border: 'none',
    backgroundColor: 'transparent',
  },
  '&:active': {
    border: 'none',
    backgroundColor: 'transparent',
  },
  '&:focus': {
    border: 'none',
    backgroundColor: 'transparent',
  },
});
