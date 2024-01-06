import { Badge, Box, Stack, Typography, useTheme } from '@mui/material';
import { Avatar } from '@mui/material';
import StyledBadge from '../avatar/StyledBadge';
import React from 'react';
import { formatMongoTime } from '../../utils/formatTime';
interface ChatElementProps {
  displayName: string;
  avatar?: string;
  text?: string;
  type?: string;
  createdAt?: string;
  unread?: number;
  online?: boolean;
  selected: boolean;
  onClick: () => void;
}
const ChatElement: React.FC<ChatElementProps> = ({
  displayName,
  avatar,
  text = 'default message',
  type = 'text',
  createdAt = '0:00',
  unread = 0,
  online = false,
  selected,
  onClick,
  ...props
}) => {
  const theme = useTheme();
  return (
    <Box
      onClick={onClick}
      sx={{
        width: '100%',
        height: 70,
        borderRadius: 1,
        padding: 1.4,
        cursor: 'pointer',
        backgroundColor: selected
          ? theme.palette.primary.main
          : theme.palette.mode === 'light'
          ? '#fff'
          : theme.palette.background.default,
      }}
      {...props}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" height="100%">
        <Stack direction="row" spacing={2}>
          {online ? (
            <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
              <Avatar alt="Remy Sharp" src={avatar} />
            </StyledBadge>
          ) : (
            <Avatar alt="Remy Sharp" src={avatar} />
          )}

          <Stack spacing={0.3}>
            <Typography variant="subtitle2" color={selected ? '#eee8e8' : theme.palette.text.primary}>
              {displayName}
            </Typography>
            <Typography variant="body1" fontSize={15} color={selected ? '#eee8e8' : '#7f8c8d'}>
              {type === 'text' ? text : 'no'}
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} alignItems="center">
          <Typography variant="body1" fontSize={14} color={selected ? '#eee8e8' : '#7f8c8d'}>
            {formatMongoTime(createdAt)}
          </Typography>
          {!selected && <Badge color="primary" badgeContent={unread} max={5}></Badge>}
        </Stack>
      </Stack>
    </Box>
  );
};

export default ChatElement;
