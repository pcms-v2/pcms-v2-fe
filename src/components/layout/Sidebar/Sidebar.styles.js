import styled from '@emotion/styled';

export const SidebarContainer = styled.div`
  min-width: 200px;
  width: 200px;
  height: 100vh;
  flex-shrink: 0;
  background: #fff;
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.1);
  padding: 20px;
  box-sizing: border-box;

  & div {
    box-sizing: border-box;
  }

  // position: relative;
  position: fixed;
  z-index: 999;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  position: sticky;
`;

export const TitleBox = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.54px;
`;

export const WelcomeMessage = styled.div`
  color: #4d4d4d;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.42px;
  margin-bottom: 20px;
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  color: #ef831f;
  leading-trim: both;
  text-edge: cap;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.42px;
  border: none;
  background-color: white;
  cursor: pointer;
  padding: 0;

  svg {
    margin-left: 3px;
  }
`;

export const Divider = styled.div`
  width: 160px;
  height: 1px;
  background: #ef831f;
  margin-bottom: 20px;
`;

export const RouteList = styled.ul``;

export const ListItems = styled.div`
  padding-bottom: 20px;
  position: relative;
`;

export const ListItem = styled.li`
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.48px;
  color: ${props => (props.active ? '#ef831f' : 'inherit')};
  position: relative;
  padding-right: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${props =>
    props.active &&
    `
    &::before {
      content: '';
      position: absolute;
      right: -20px;
      top: 0px;
      bottom: 0px;
      width: 3px;
      background-color: #ef831f;
    }
  `}
`;

export const ArrowWrapper = styled.span`
  position: absolute;
  right: 0;
  top: 43%;
  transform: translateY(-50%);
`;
