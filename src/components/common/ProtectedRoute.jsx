// components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../../contexts/useUserStore';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ allowedRole }) => {
  const { userInfo } = useUserStore();
  const userRoles = userInfo?.roles || [];

  const isAccessDenied = !userRoles.includes(allowedRole);
  if (isAccessDenied) {
    return <Navigate to='/' replace />;
  }
  return <Outlet />;
};

ProtectedRoute.propTypes = {
  allowedRole: PropTypes.string.isRequired,
};

export default ProtectedRoute;
