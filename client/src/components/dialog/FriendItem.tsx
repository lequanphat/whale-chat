import { Avatar, Button, Stack, Typography } from '@mui/material';
import { FiPlus } from 'react-icons/fi';
import { User } from './types';
import { useDispatch } from 'react-redux';
import { createFriendRequests } from '../../store/slices/relationshipSlice';
import { openSuccessSnackbar } from '../../store/slices/appSlice';
export const FriendItem = ({ user }: { user: User }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  // handle
  const handleSendFriendRequest = (receiveId: string) => {
    console.log(`send friend request to ${user.displayName}`);
    (async () => {
      const response = await dispatch(createFriendRequests({ receiveId, text: 'Ket ban voi minh nhe' }));
      if (!response.payload.error) {
        dispatch(openSuccessSnackbar('Successfully'));
      }
    })();
  };
  // render
  return (
    <Stack px={3} direction="row" alignItems="center" justifyContent="space-between">
      <Stack direction="row" alignItems="center" spacing={1.4}>
        <Avatar src={user.avatar} />
        <Stack>
          <Typography variant="body2" fontSize={15} sx={{ opacity: 0.6 }}>
            {user.displayName}
          </Typography>
          <Typography variant="body1" fontSize={15} sx={{ opacity: 0.6 }}>
            {user.email}
          </Typography>
        </Stack>
      </Stack>
      <Button
        variant="outlined"
        sx={{ fontSize: 12, py: 0.4, px: 2, borderRadius: 1 }}
        onClick={() => {
          handleSendFriendRequest(user._id);
        }}
      >
        Add
        <FiPlus />
      </Button>
    </Stack>
  );
};
