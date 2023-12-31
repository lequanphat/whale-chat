import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { stateType } from '../../store/interface';
import Loading from '../../components/loading/Loading';

export default function MainLayout() {
  const { auth, isLoading } = useSelector((state: stateType) => state.auth);

  if (auth) {
    return <Navigate to="/app" />;
  }
  return <>{isLoading ? <Loading /> : <Outlet />}</>;
}
