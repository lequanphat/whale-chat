import { ComponentType, Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from '../layouts/dashboard';
import { DEFAULT_PATH } from '../config';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

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
            path: '/',
            element: <DashboardLayout />,
            children: [
                { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
                { path: 'app', element: <GeneralApp /> },
                { path: 'settings', element: <Settings /> },
                { path: '404', element: <h1>404</h1> },
                { path: '*', element: <Navigate to="/404" replace /> },
            ],
        },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '*', element: <Navigate to="/404" replace /> },
    ]);
}

// dinamic import
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const Settings = Loadable(lazy(() => import('../pages/dashboard/Settings')));
