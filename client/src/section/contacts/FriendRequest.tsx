import { Grid, Stack, Typography, useTheme } from '@mui/material';
import { FriendRequestItem } from './FriendRequestItem';
import { useDispatch, useSelector } from 'react-redux';
import { FriendRequestType } from './types';
import { stateType } from '../../store/interface';
import { useEffect } from 'react';
import { getAllFriendRequests } from '../../store/slices/relationshipSlice';

const FriendRequest = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const theme = useTheme();
  const { friendRequests } = useSelector((state: stateType) => state.relationship);

  // useEffect
  useEffect(() => {
    dispatch(getAllFriendRequests());
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
          <Typography variant="body2">Invitation received ({friendRequests.receive?.length})</Typography>
        </Stack>
        <Grid container spacing={2}>
          {friendRequests.receive?.map((item) => (
            <FriendRequestItem key={item._id} value={item} type={FriendRequestType.RECEIVE} />
          ))}
        </Grid>
        <Stack mb={2} mt={4}>
          <Typography variant="body2">Invitation sent ({friendRequests.send?.length})</Typography>
        </Stack>
        <Grid container spacing={2}>
          {friendRequests.send?.map((item) => (
            <FriendRequestItem key={item._id} value={item} type={FriendRequestType.SEND} />
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
};
export default FriendRequest;
