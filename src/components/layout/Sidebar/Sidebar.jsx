import { useCallback, useMemo } from 'react';
import { Link, useLocation, useNavigate, useMatch } from 'react-router-dom';
import { logout } from '../../../services/authService';
import { ALL_LINKS } from '../../../constants/links';
import {
  ArrowWrapper,
  Divider,
  HeaderContainer,
  ListItem,
  ListItems,
  LogoutButton,
  RouteList,
  SidebarContainer,
  TitleBox,
  WelcomeMessage,
} from './Sidebar.styles';
import { useUserStore } from '../../../contexts/useUserStore';
import Icon from '../../common/Icon';

// 사용자 권한에 따라 보여줄 링크를 가져오는 함수
const getLinks = role =>
  ALL_LINKS.filter(link => link.roles.includes(role)).map(
    ({ text, title }) => ({
      path: `/${role}/${text}`,
      text,
      title,
    })
  );

const Sidebar = () => {
  const location = useLocation(); // 현재 경로를 가져오기 위해 사용
  const navigate = useNavigate(); // 페이지 이동을 위해 사용
  const { userInfo } = useUserStore();
  // useUserStorage에서 사용자 정보 가져오기
  const { userRole, userName, links } = useMemo(() => {
    // userRole, userName을 가져옴
    const userName = userInfo.userName;
    const userRole = userInfo.roles;

    // userRole이 shipper일 경우 shipper 링크, admin일 경우 admin 링크를 가져옴
    const links = userRole.includes('shipper'.toUpperCase())
      ? getLinks('shipper')
      : getLinks('admin');
    return { userRole, userName, links };
  }, [userInfo]);

  // 로그아웃 핸들러
  const handleLogout = useCallback(() => {
    logout();
    navigate('/login');
  }, [navigate]);

  // 현재 경로가 링크와 일치하는지 확인
  const isActive = useCallback(
    path => {
      const match = useMatch({
        path: `${path}/*`,
        end: false,
      });
      return !!match;
    },
    [location.pathname]
  );

  return (
    <SidebarContainer>
      <div>
        <HeaderContainer>
          <TitleBox>SMS</TitleBox>
          <LogoutButton onClick={handleLogout}>
            Log out
            <Icon iconType='logout' />
          </LogoutButton>
        </HeaderContainer>
        <WelcomeMessage>{`${userName}님 반갑습니다 :)`}</WelcomeMessage>
        <Divider />
      </div>
      <RouteList aria-label='main mailbox folders'>
        {links.map((link, index) => (
          <ListItems key={index}>
            <Link to={link.path}>
              <ListItem active={isActive(link.path)}>
                {link.title}
                {isActive(link.path) && (
                  <ArrowWrapper>
                    <Icon iconType='sidebarArrow' />
                  </ArrowWrapper>
                )}
              </ListItem>
            </Link>
          </ListItems>
        ))}
      </RouteList>
    </SidebarContainer>
  );
};

export default Sidebar;
