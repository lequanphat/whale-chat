import { Avatar, Button, Stack, Typography } from '@mui/material';
import { FiPlus } from 'react-icons/fi';
export const FriendItem = () => {
  return (
    <Stack px={3} direction="row" alignItems="center" justifyContent="space-between">
      <Stack direction="row" alignItems="center" spacing={1}>
        <Avatar />
        <Stack>
          <Typography variant="body2" fontSize={15} sx={{ opacity: 0.6 }}>
            Quan Phát
          </Typography>
          <Typography variant="body1" fontSize={15} sx={{ opacity: 0.6 }}>
            lequanphat@gmail.com
          </Typography>
        </Stack>
      </Stack>
      <Button variant="outlined" sx={{ fontSize: 12, py: 0.4, px: 2,borderRadius:1 }}>
        Add
        <FiPlus />
      </Button>
    </Stack>
  );
};
