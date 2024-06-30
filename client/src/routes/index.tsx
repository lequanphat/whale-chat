import { ComponentType, Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from '../layouts/dashboard';
import MainLayout from '../layouts/main';
import { DEFAULT_PATH } from '../config';
import Loading from '../components/loading/Loading';
import { Chat } from '../pages/dashboard/Chat';
import EmptyChat from '../section/chat/chat/EmptyChat';
import { AdminLayout } from '../layouts/admin';

interface Props {}

const Loadable = (Component: ComponentType<Props>) => (props: Props) => {
  return (
    <Suspense fallback={<Loading />}>
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
        { path: 'reset-password/:token', element: <ResetPassword /> },
        { path: 'verify-email', element: <VerifyEmail /> },
        { path: 'verify-account', element: <VerifyAccount /> },
      ],
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        {
          path: 'app',
          element: <GeneralApp />,
          children: [
            { path: 'chat/:chatId', element: <Chat /> },
            { path: '*', element: <EmptyChat /> },
          ],
        },
        {
          path: 'contacts',
          element: <Contacts />,
          children: [
            {
              path: 'friends',
              element: <Friends />,
            },
            {
              path: 'groups',
              element: <Groups />,
            },
            {
              path: 'friend-request',
              element: <FriendRequest />,
            },
          ],
        },
        { path: 'gpt', element: <AiChat /> },
        { path: 'settings', element: <Settings /> },
        { path: 'profile', element: <Profile /> },
        { path: 'notifications', element: <Notification /> },
        { path: 'personal/:userId', element: <PersonalPage /> },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/admin',
      element: <AdminLayout />,
      children: [{ path: '', element: <h1>hahaha</h1> }],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// dinamic import
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const Settings = Loadable(lazy(() => import('../pages/dashboard/Settings')));
const Profile = Loadable(lazy(() => import('../pages/dashboard/Profile')));
const Contacts = Loadable(lazy(() => import('../pages/dashboard/Contacts')));
const Friends = Loadable(lazy(() => import('../section/contacts/Friends')));
const Groups = Loadable(lazy(() => import('../section/contacts/Groups')));
const FriendRequest = Loadable(lazy(() => import('../section/contacts/FriendRequest')));
const AiChat = Loadable(lazy(() => import('../pages/dashboard/AiChat')));
const Notification = Loadable(lazy(() => import('../pages/dashboard/Notification')));
const PersonalPage = Loadable(lazy(() => import('../pages/dashboard/PersonalPage')));
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ForgotPassword = Loadable(lazy(() => import('../pages/auth/ForgotPassword')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const VerifyEmail = Loadable(lazy(() => import('../pages/auth/VerifyEmail')));
const VerifyAccount = Loadable(lazy(() => import('../pages/auth/VerifyAccount')));
const Page404 = Loadable(lazy(() => import('../pages/errors/Page404')));
