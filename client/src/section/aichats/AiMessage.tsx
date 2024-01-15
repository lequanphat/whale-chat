import { Avatar, Stack, Typography, useTheme } from '@mui/material';
import logo from '../../assets/logo.png';
export const AiMessage = ({ message }) => {
  const theme = useTheme();
  return (
    <Stack width="100%" direction="row" justifyContent={message.role === 'user' ? 'end' : 'start'} spacing={1}>
      {message.role === 'assistant' && <Avatar src={logo} />}
      <Stack
        sx={{
          backgroundColor: message.role === 'user' ? theme.palette.primary.main : theme.palette.background.paper,
          borderRadius: 1.8,
          width: 'max-content',
          maxWidth: 400,
          p: '10px 16px',
        }}
      >
        <Typography variant="body1" color={message.role === 'user' ? '#fff' : theme.palette.text.primary}>
          {message.content}
        </Typography>
      </Stack>
    </Stack>
  );
};
