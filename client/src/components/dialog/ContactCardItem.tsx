import { Avatar, Button, Stack, Typography, useTheme } from '@mui/material';
import { User } from './types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContactMessage } from '../../store/slices/chatSlice';
import { stateType } from '../../store/interface';
import { useSocket } from '../../hooks/useSocket';
export const ContactCardItem = ({ user }: { user: User }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const theme = useTheme();
  const { emitMessage } = useSocket();
  const { currentContact } = useSelector((state: stateType) => state.chat);
  const [userInstance, setUserInstance] = useState(user);
  // handle
  const handleSendFriendRequest = (user: User) => {
    (async () => {
      const response = await dispatch(
        addContactMessage({
          from: '',
          to: currentContact._id,
          contact: {
            _id: user._id,
            avatar: user.avatar,
            displayName: user.displayName,
            email: user.email,
          },
        }),
      );
      emitMessage(response.payload.message);
      setUserInstance({ ...userInstance, status: 'Sended' });
    })();
  };
  // render
  return (
    <Stack px={3} direction="row" alignItems="center" justifyContent="space-between">
      <Stack direction="row" alignItems="center" spacing={1.4}>
        <Avatar src={userInstance.avatar} />
        <Stack>
          <Typography variant="body2" fontSize={15}>
            {userInstance.displayName}
          </Typography>
          <Typography variant="body1" fontSize={15} sx={{ opacity: 0.8 }}>
            {userInstance.email}
          </Typography>
        </Stack>
      </Stack>
      {userInstance.status == 'Sended' ? (
        <Typography variant="body2" color={theme.palette.primary.main} fontSize={12}>
          Sended
        </Typography>
      ) : (
        <Button
          variant="outlined"
          sx={{ fontSize: 12, py: 0.4, px: 2, borderRadius: 1 }}
          onClick={() => {
            handleSendFriendRequest(userInstance);
          }}
        >
          Send
        </Button>
      )}
    </Stack>
  );
};
