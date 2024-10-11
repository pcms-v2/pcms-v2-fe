import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';

const Layout = lazy(() => import('../components/layout/Layout'));

const AdminRouting = lazy(() => import('../pages/admin/AdminRouting'));
const AdminRoutingMain = lazy(
  () => import('../pages/admin/AdminRouting/components/AdminRoutingMain')
);
const AdminRoutingMainAdd = lazy(
  () => import('../pages/admin/AdminRouting/components/AdminRoutingMainAdd')
);
const AdminRoutingMainModify = lazy(
  () => import('../pages/admin/AdminRouting/components/AdminRoutingMainModify')
);
const AdminRoutingMainDetail = lazy(
  () => import('../pages/admin/AdminRouting/components/AdminRoutingMainDetail')
);
const AdminDeliveryDriver = lazy(
  () => import('../pages/admin/AdminDeliveryDriver')
);
const AdminDeliveryRound = lazy(
  () => import('../pages/admin/AdminDeliveryRound')
);
const AdminDeliveryRoundDetail = lazy(
  () =>
    import(
      '../pages/admin/AdminDeliveryRound/components/AdminDeliveryRoundDetail'
    )
);
const AdminDeliveryRoundDispatch = lazy(
  () =>
    import(
      '../pages/admin/AdminDeliveryRound/components/AdminDeliveryRoundDispatch'
    )
);
const AdminDeliveryRoundDispatchDetail = lazy(
  () =>
    import(
      '../pages/admin/AdminDeliveryRound/components/AdminDeliveryRoundDispatchDetail'
    )
);

const ProtectedRoute = lazy(
  () => import('../components/common/ProtectedRoute')
);
const Login = lazy(() => import('../pages/Login'));
const RoleRedirect = lazy(() => import('../components/common/RoleRedirect'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RoleRedirect />,
  },
  {
    path: '/admin',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <ProtectedRoute allowedRole='ADMIN' />,
        children: [
          {
            path: 'routing-type',
            element: <AdminRouting />,
            children: [
              {
                path: 'main',
                element: <AdminRoutingMain />,
              },
              {
                path: 'main/add',
                element: <AdminRoutingMainAdd />,
              },
              {
                path: 'main/update',
                element: <AdminRoutingMainModify />,
              },
              {
                path: 'main/detail',
                element: <AdminRoutingMainDetail />,
              },
            ],
          },
          {
            path: 'deliveryDriver',
            element: <AdminDeliveryDriver />,
          },
          {
            path: 'deliveryRound',
            element: <AdminDeliveryRound />,
            children: [
              {
                path: 'detail/:deliveryRoundId',
                element: <AdminDeliveryRoundDetail />,
                children: [
                  {
                    path: 'dispatch',
                    element: <AdminDeliveryRoundDispatch />,
                  },
                  {
                    path: 'dispatchDetail',
                    element: <AdminDeliveryRoundDispatchDetail />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <Login display={false} />,
  },
]);

export default router;
