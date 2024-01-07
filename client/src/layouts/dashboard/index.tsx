import { Stack } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import { stateType } from '../../store/interface';

import Loading from '../../components/loading/Loading';
import { Role } from '../../store/types';

const DashboardLayout = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { auth, role, isLoading } = useSelector((state: stateType) => state.auth);

  if (!auth || role !== Role.USER) {
    return <Navigate to="/auth/login"></Navigate>;
  }

  return (
    <Stack direction="row">
      <Sidebar />
      {isLoading ? <Loading /> : <Outlet />}
    </Stack>
  );
};

export default DashboardLayout;
