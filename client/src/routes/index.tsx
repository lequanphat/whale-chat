import { ComponentType, Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from '../layouts/dashboard';
import MainLayout from '../layouts/main';
import { DEFAULT_PATH } from '../config';

interface Props {}

const Loadable = (Component: ComponentType<Props>) => (props: Props) => {
    return (
        <Suspense fallback={'loading screen...'}>
            <Component {...props} />
        </Suspense>
    );
};

export default function Router() {
    return useRoutes([
        {
            path: '/auth',
            element: <MainLayout />,
            children: [
                { path: 'login', element: <Login /> },
                { path: 'register', element: <Register /> },
                { path: 'forgot-password', element: <ForgotPassword /> },
                { path: 'reset-password', element: <ResetPassword /> },
            ],
        },
        {
            path: '/',
            element: <DashboardLayout />,
            children: [
                { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
                { path: 'app', element: <GeneralApp /> },
                { path: 'settings', element: <Settings /> },
                { path: '404', element: <Page404 /> },
                { path: '*', element: <Navigate to="/404" replace /> },
            ],
        },
        { path: '*', element: <Navigate to="/404" replace /> },
    ]);
}

// dinamic import
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const Settings = Loadable(lazy(() => import('../pages/dashboard/Settings')));
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ForgotPassword = Loadable(lazy(() => import('../pages/auth/ForgotPassword')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const Page404 = Loadable(lazy(() => import('../pages/errors/Page404')));
