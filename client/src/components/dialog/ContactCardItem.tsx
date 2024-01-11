import { Avatar, Button, Stack, Typography, useTheme } from '@mui/material';
import { User } from './types';
import { useState } from 'react';
export const ContactCardItem = ({ user }: { user: User }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const theme = useTheme();
  const [userInstance, setUserInstance] = useState(user);
  // handle
  const handleSendFriendRequest = (userId: string) => {
    (async () => {
      console.log(userId);
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
            handleSendFriendRequest(userInstance._id);
          }}
        >
          Send
        </Button>
      )}
    </Stack>
  );
};
