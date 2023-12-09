import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from '../layouts/dashboard';
import { DEFAULT_PATH } from '../config';
import AiChat from '../pages/AiChat';



const Loadable = (Component) => (props) => {
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
                { path: '404', element: <Page404 /> },
                { path: 'ai-chat', element: <AiChat /> },
                { path: '*', element: <Navigate to="/404" replace /> },
            ],
        },
        { path: '*', element: <Navigate to="/404" replace /> },
    ]);
}

// dinamic import
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const Page404 = Loadable(lazy(() => import('../pages/Page404')));