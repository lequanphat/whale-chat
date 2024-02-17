import { Box, Stack, Typography, useTheme } from '@mui/material';
import { MouseEventHandler } from 'react';
import { IoNotificationsOutline } from 'react-icons/io5';
import { formatMongoTime } from '../../utils/formatTime';
import { Notification } from '../../store/types';

export const NotificationItem = ({
  selected,
  notification,
  onClick,
}: {
  selected?: boolean;
  notification: Notification;
  onClick: MouseEventHandler;
}) => {
  const theme = useTheme();
  return (
    <Stack
      onClick={onClick}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      py={1}
      px={2}
      sx={{
        bgcolor: selected
          ? theme.palette.primary.main
          : !notification.seen
          ? '#c5e2fb'
          : theme.palette.background.default,
        cursor: 'pointer',
        borderBottom: '1px solid #eee',
        ':hover': {
          bgcolor: !selected && theme.palette.background.paper,
        },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2} sx={{ color: selected && '#fff' }}>
        <IoNotificationsOutline size={22} />
        <Stack>
          <Typography
            variant="body2"
            fontSize={15}
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '180px',
            }}
          >
            {notification.title}
          </Typography>
          <Typography
            variant="body1"
            fontSize={14}
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '180px',
            }}
          >
            {notification.content}
          </Typography>
          <Typography variant="body1" fontSize={14}>
            {formatMongoTime(notification.createdAt)}
          </Typography>
        </Stack>
      </Stack>
      {!notification.seen && (
        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: theme.palette.primary.main }}></Box>
      )}
    </Stack>
  );
};
