import { Stack, Typography, useTheme } from '@mui/material';
import { FriendRequestItem } from './FriendRequestItem';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllFriendRequests, getAllFriendRequestsFromSelf } from '../../store/slices/relationshipSlice';
import { FriendRequestType } from './types';

const FriendRequest = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const theme = useTheme();
  const [friendRequests, setFriendRequests] = useState([]);
  const [friendRequestsFromSelf, setFriendRequestsFromSelf] = useState([]);
  // effect
  useEffect(() => {
    (async () => {
      const response1 = await dispatch(getAllFriendRequests());
      console.log(response1);
      if (!response1.error) {
        setFriendRequests(response1.payload);
      }
      const response2 = await dispatch(getAllFriendRequestsFromSelf());
      console.log(response2);
      if (!response2.error) {
        setFriendRequestsFromSelf(response2.payload);
      }
    })();
  }, [dispatch]);

  //render
  return (
    <Stack flexGrow={1} bgcolor={theme.palette.background.paper}>
      <Stack
        flexDirection="row"
        alignItems="center"
        sx={{
          height: 50,
          width: '100%',
          backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.paper,
          boxShadow: '0px 0px 2px rgba(0,0,0, .25)',
        }}
        p={2}
      >
        <Typography variant="body2">Friend Request</Typography>
      </Stack>
      <Stack p={2}>
        <Stack mb={2} mt={2}>
          <Typography variant="body2">Invitation received ({friendRequests.length})</Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          {friendRequests.map((item) => (
            <FriendRequestItem key={item._id} value={item} type={FriendRequestType.RECEIVE} />
          ))}
        </Stack>
        <Stack mb={2} mt={4}>
          <Typography variant="body2">Invitation sent ({friendRequestsFromSelf.length})</Typography>
        </Stack>
        <Stack direction="row" spacing={2} mb={2}>
          {friendRequestsFromSelf.map((item) => (
            <FriendRequestItem key={item._id} value={item} type={FriendRequestType.SEND} />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};
export default FriendRequest;
