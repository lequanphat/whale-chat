import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { stateType } from '../../store/interface';
import CoverLoading from '../../components/loading/CoverLoading';

export default function MainLayout() {
  const { auth, isLoading } = useSelector((state: stateType) => state.auth);

  if (auth) {
    return <Navigate to="/app" />;
  }
  return (
    <>
      {isLoading && <CoverLoading />}
      <Outlet />
    </>
  );
}
