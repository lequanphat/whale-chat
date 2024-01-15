import { Avatar, Box, IconButton, Stack, Typography, useTheme } from '@mui/material';
import logo from '../../assets/logo.png';
import { IoPowerOutline } from 'react-icons/io5';
export const ChatHeader = ({ handleOff }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: 70,
        width: '100%',
        backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.paper,
      }}
      p={2}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={1.2}>
          <Avatar src={logo} />
          <Typography variant="body2">WhaleBot</Typography>
        </Stack>
        <IconButton onClick={handleOff}>
          <IoPowerOutline />
        </IconButton>
      </Stack>
    </Box>
  );
};
