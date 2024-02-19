import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import CoverLoading from '../../components/loading/CoverLoading';
import { Role, stateType } from '../../store/types';

export default function MainLayout() {
  const { auth, role, isLoading } = useSelector((state: stateType) => state.auth);

  if (auth) {
    switch (role) {
      case Role.USER:
        return <Navigate to="/app" />;
      case Role.ADMIN:
        return <Navigate to="/admin" />;
      default:
        break;
    }
  }
  return (
    <>
      {isLoading && <CoverLoading />}
      <Outlet />
    </>
  );
}
