import { Stack, Typography, useTheme } from '@mui/material';
import { FriendRequestItem } from './FriendRequestItem';

const FriendRequest = () => {
  const theme = useTheme();
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
          <Typography variant="body2">Invitation received (1)</Typography>
        </Stack>
        <Stack direction="row" spacing={2} >
          <FriendRequestItem />
          <FriendRequestItem />
        </Stack>
        <Stack mb={2} mt={4}>
          <Typography variant="body2">Invitation sent (0)</Typography>
        </Stack>
        <Stack direction="row" spacing={2} mb={2}>
          <FriendRequestItem />
        </Stack>
      </Stack>
    </Stack>
  );
};
export default FriendRequest;
