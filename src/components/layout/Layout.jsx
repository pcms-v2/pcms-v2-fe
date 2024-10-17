import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';
import { Containter } from './Layout.styles';
import { useUserStore } from '../../contexts/useUserStore';
import ModalSection from './ModalSection.jsx';

const Layout = () => {
  const { userInfo } = useUserStore();
  const accessToken = userInfo?.accessToken;

  if (!accessToken) {
    return <Navigate to='/login' replace />;
  }

  return (
    <Containter>
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
      <ModalSection />
    </Containter>
  );
};

export default Layout;
