import { Avatar, Box, Button, Grid, Stack, Typography, useTheme } from '@mui/material';
import { formatMongoTime } from '../../utils/formatTime';
import { useDispatch } from 'react-redux';
import { acceptFriendRequests, deleteFriendRequests } from '../../store/slices/relationshipSlice';
import { FriendRequestType } from './types';
import { ReceiveFriendRequest, SendFriendRequest } from '../../store/types';
import { useSocket } from '../../hooks/useSocket';

export const FriendRequestItem = ({
  type = FriendRequestType.SEND,
  value,
}: {
  type?: FriendRequestType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: SendFriendRequest | ReceiveFriendRequest | any;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const theme = useTheme();
  const { emitAcceptFriend } = useSocket();

  // handle
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDeleteFriendRequest = async ({ sendId, receiveId }: { sendId: any; receiveId: any }) => {
    dispatch(deleteFriendRequests({ sendId, receiveId }));
  };
  const handleAcceptFriendRequest = async () => {
    const response = await dispatch(acceptFriendRequests({ friendRequestId: value._id }));
    if (!response.payload.error) {
      emitAcceptFriend({
        contact: response.payload.contact,
        recentMessage: response.payload.recentMessage,
        to: value.sendId._id,
        total: 1,
      });
    }
  };

  // render
  return (
    <Grid item xs={6} sm={4} md={3}>
      <Box
        p={2}
        sx={{
          bgcolor: theme.palette.background.default,
          borderRadius: 0.8,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar
            sx={{ width: 45, height: 45 }}
            src={type === FriendRequestType.RECEIVE ? value.sendId.avatar : value.receiveId.avatar}
          />
          <Stack>
            <Typography variant="body2" fontSize={16}>
              {type === FriendRequestType.RECEIVE ? value.sendId.displayName : value.receiveId.displayName}
            </Typography>
            <Typography variant="body1" fontSize={14}>
              {formatMongoTime(value.createdAt)}
            </Typography>
          </Stack>
        </Stack>
        <Box p={1} mt={2} mb={2} bgcolor={theme.palette.background.paper} sx={{ borderRadius: 0.4 }}>
          <Typography variant="body1" fontSize={14}>
            {value.text}
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              color: theme.palette.text.primary,
              bgcolor: theme.palette.background.paper,
              boxShadow: 'none',
              ':hover': {
                bgcolor: theme.palette.background.paper,
              },
            }}
            onClick={
              type === FriendRequestType.RECEIVE
                ? () => {
                    handleDeleteFriendRequest({ sendId: value.sendId._id, receiveId: value.receiveId });
                  }
                : () => {
                    handleDeleteFriendRequest({ sendId: value.sendId, receiveId: value.receiveId._id });
                  }
            }
          >
            Cancel
          </Button>
          {type == FriendRequestType.RECEIVE && (
            <Button
              variant="contained"
              fullWidth
              sx={{
                boxShadow: 'none',
              }}
              onClick={handleAcceptFriendRequest}
            >
              Accept
            </Button>
          )}
        </Stack>
      </Box>
    </Grid>
  );
};
