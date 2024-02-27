import { Stack } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../components/loading/Loading';
import { CallType, Role, stateType } from '../../store/types';
import { AddFriendsDialog } from '../../components/dialog/AddFriendsDialog';
import VideoCalls from '../../components/calls/VideoCall';
import VoiceCall from '../../components/calls/VoiceCall';
import { useEffect } from 'react';
import { getUser } from '../../store/slices/authSlice';

const DashboardLayout = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const { auth, role, isLoading } = useSelector((state: stateType) => state.auth);
  const { addFriendDialog } = useSelector((state: stateType) => state.app);
  const { call } = useSelector((state: stateType) => state.chat);

  useEffect(() => {
    dispatch(getUser());
  }, []);
  if (!auth || role !== Role.USER) {
    return <Navigate to="/auth/login"></Navigate>;
  }

  return (
    <Stack direction="row">
      <Sidebar />
      {isLoading ? <Loading /> : <Outlet />}
      {addFriendDialog.open && <AddFriendsDialog open={addFriendDialog.open} />}
      {call.open && call.type === CallType.VIDEO_CALL && (
        <VideoCalls open={call.open && call.type === CallType.VIDEO_CALL} />
      )}
      {call.open && call.type === CallType.VOICE_CALL && (
        <VoiceCall open={call.open && call.type === CallType.VOICE_CALL} />
      )}
    </Stack>
  );
};

export default DashboardLayout;
