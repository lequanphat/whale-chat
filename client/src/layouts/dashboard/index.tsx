import { Stack } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';

import Loading from '../../components/loading/Loading';
import { Role, stateType } from '../../store/types';
import { AddFriendsDialog } from '../../components/dialog/AddFriendsDialog';
import VideoCalls from '../../components/calls/VideoCalls';

const DashboardLayout = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { auth, role, isLoading } = useSelector((state: stateType) => state.auth);
  const { addFriendDialog } = useSelector((state: stateType) => state.app);
  const { call } = useSelector((state: stateType) => state.chat);

  if (!auth || role !== Role.USER) {
    return <Navigate to="/auth/login"></Navigate>;
  }
  return (
    <Stack direction="row">
      <Sidebar />
      {isLoading ? <Loading /> : <Outlet />}
      {addFriendDialog.open && <AddFriendsDialog open={addFriendDialog.open} />}
      {call.open && <VideoCalls open={call.open} />}
    </Stack>
  );
};

export default DashboardLayout;
