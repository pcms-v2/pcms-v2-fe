import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../../contexts/useUserStore';

const RoleRedirect = () => {
  const { userInfo } = useUserStore();
  const userRoles = userInfo?.roles || [];
  const accessToken = userInfo?.accessToken;

  if (!accessToken) {
    return <Navigate to='/login' replace />;
  }

  if (userRoles.includes('ADMIN') && window.location.pathname === '/') {
    return <Navigate to='/admin/routing-type' replace />;
  }

  const shipperRoleToPathMap = {
    SHIPPER_DELIVERY: '/shipper/deliveryRound',
  };
  if (userRoles.includes('SHIPPER') && window.location.pathname === '/') {
    const shipperRole = userInfo?.roles.find(
      role => shipperRoleToPathMap[role]
    );
    return <Navigate to={shipperRoleToPathMap[shipperRole]} replace />;
  }

  return <Outlet />;
};

export default RoleRedirect;
