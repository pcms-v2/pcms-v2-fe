import styled from '@emotion/styled';

export const HeaderContainer = styled.div`
  width: 100%;
  // height: 125px;
  display: flex;
  flex-direction: column;
`;

export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 22px;
  padding-bottom: 22px;
`;

export const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const BottomLeftContainer = styled.div`
  display: flex;
  gap: 26px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 20px;
`;

// export const Filter = styled.div`
//   display: flex;
//   gap: 26px;
//   flex-direction: row;
// `;

export const StatusBoxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const MainTitle = styled.h1`
  color: #2c2c2c;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.54px;
`;

export const SubTitle = styled.span`
  color: #2c2c2c;
  leading-trim: both;
  text-edge: cap;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.48px;

  margin-left: 8px;
`;

export const SecondStatusTitle = styled.div`
  color: #4d4d4d;
  leading-trim: both;
  text-edge: cap;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.48px;
`;
