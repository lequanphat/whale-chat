import { Button, Stack, Typography } from '@mui/material';
import { formatMongoTime } from '../../utils/formatTime';
import { Notification } from '../../store/types';
export const NotificationDetails = ({
  notification,
  handleDelete,
}: {
  notification: Notification;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleDelete: any;
}) => {
  return (
    <Stack flexGrow={1} p={3} justifyContent="space-between">
      <Stack spacing={1.6}>
        <Typography variant="body2" fontSize={18}>
          {notification.title}
        </Typography>
        <Typography variant="body1" fontSize={14}>
          {formatMongoTime(notification.createdAt)}
        </Typography>
        <Typography variant="body1" fontSize={16}>
          {notification.content}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="end">
        <Button variant="outlined" onClick={handleDelete}>
          Delete
        </Button>
      </Stack>
    </Stack>
  );
};
