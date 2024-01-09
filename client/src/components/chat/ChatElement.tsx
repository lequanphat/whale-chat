import { Badge, Box, Stack, Typography, useTheme } from '@mui/material';
import { Avatar } from '@mui/material';
import StyledBadge from '../avatar/StyledBadge';
import React from 'react';
import { formatMongoTime } from '../../utils/formatTime';
import { MessageType } from './types';
import { IoDocumentTextOutline, IoImageOutline } from 'react-icons/io5';
import { MdOutlineKeyboardVoice } from 'react-icons/md';
interface ChatElementProps {
  displayName: string;
  avatar?: string;
  text?: string;
  type?: MessageType;
  createdAt?: string;
  unread?: number;
  online?: boolean;
  selected?: boolean;
  onClick: () => void;
}
// eslint-disable-next-line react-refresh/only-export-components
const ChatElement: React.FC<ChatElementProps> = ({
  displayName,
  avatar,
  text = 'default message',
  type = MessageType.TEXT,
  createdAt = '0:00',
  unread = 0,
  online = false,
  selected,
  onClick,
  ...props
}) => {
  const theme = useTheme();
  const recentMessage = (type: MessageType) => {
    switch (type) {
      case MessageType.TEXT:
      case MessageType.SYSTEM:
        return (
          <Typography
            variant="body1"
            fontSize={15}
            color={selected ? '#eee8e8' : '#7f8c8d'}
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '140px',
            }}
          >
            {text}
          </Typography>
        );
      case MessageType.IMAGE:
        return (
          <>
            <Typography variant="body1" color={selected ? '#eee8e8' : '#7f8c8d'}>
              <IoImageOutline size={16} />
            </Typography>
            <Typography variant="body1" fontSize={15} color={selected ? '#eee8e8' : '#7f8c8d'}>
              image
            </Typography>
          </>
        );
      case MessageType.VOICE:
        return (
          <>
            <Typography variant="body1" color={selected ? '#eee8e8' : '#7f8c8d'}>
              <MdOutlineKeyboardVoice size={16} />
            </Typography>
            <Typography variant="body1" fontSize={15} color={selected ? '#eee8e8' : '#7f8c8d'}>
              voice
            </Typography>
          </>
        );
      case MessageType.DOC:
        return (
          <>
            <Typography variant="body1" color={selected ? '#eee8e8' : '#7f8c8d'}>
              <IoDocumentTextOutline size={16} />
            </Typography>
            <Typography variant="body1" fontSize={15} color={selected ? '#eee8e8' : '#7f8c8d'}>
              document
            </Typography>
          </>
        );

      default:
        return (
          <Typography variant="body1" fontSize={15} color={selected ? '#eee8e8' : '#7f8c8d'}>
            ...
          </Typography>
        );
    }
  };
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
            <Stack direction="row" alignItems="center" spacing={0.4}>
              {recentMessage(type)}
            </Stack>
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

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(ChatElement);
