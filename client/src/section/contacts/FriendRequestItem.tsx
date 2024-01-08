import { Avatar, Box, Button, Stack, Typography, useTheme } from '@mui/material';

export enum FriendRequestType {
  SEND = 'send',
  RECEIVE = 'receive',
}

export const FriendRequestItem = ({ type = FriendRequestType.SEND }: { type?: FriendRequestType }) => {
  const theme = useTheme();
  return (
    <Box sx={{ bgcolor: theme.palette.background.default, borderRadius: 0.4, width: '33.33% ' }} p={2}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Avatar sx={{ width: 45, height: 45 }} />
        <Stack>
          <Typography variant="body2" fontSize={16}>
            Quan Phát
          </Typography>
          <Typography variant="body1" fontSize={14}>
            12/04/2023
          </Typography>
        </Stack>
      </Stack>
      <Box p={1} mt={2} mb={2} bgcolor={theme.palette.background.paper} sx={{ borderRadius: 0.4 }}>
        <Typography>Xin chào! Mình là Quan Phát. Kết bạn với mình nhé!</Typography>
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
          >
            Accept
          </Button>
        )}
      </Stack>
    </Box>
  );
};
