import { Stack, Typography, useTheme } from '@mui/material';
import { NotificationItem } from '../../section/notifications/NotificationItem';
import { NotificationDetails } from '../../section/notifications/NotificationDetails';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNotification, seenNotification } from '../../store/slices/notificationSlice';
import { stateType } from '../../store/interface';
import Loading from '../../components/loading/Loading';

const Notification = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const theme = useTheme();
  const [selected, setSelected] = useState<number>(null);

  const { notifications, isLoading } = useSelector((state: stateType) => state.notifications);

  const handleDeleteNotification = async (id: string) => {
    dispatch(deleteNotification(id));
    setSelected(null);
  };
  const handleSeenNotification = async (index: number) => {
    if (!notifications[index].seen) {
      dispatch(seenNotification(notifications[index]._id));
    }
    setSelected(index);
  };

  return (
    <Stack direction="row" width="100%">
      <Stack
        sx={{
          width: 320,
          height: '100vh',
          backgroundColor: theme.palette.mode === 'light' ? '#f0f4ff' : theme.palette.background.paper,
          boxShadow: '0px 0px 2px rgba(0,0,0,.2)',
        }}
      >
        <Stack px={3} py={2}>
          <Typography variant="h6">Notifications</Typography>
        </Stack>
        <Stack
          spacing={1.6}
          p={3}
          pt={0}
          sx={{
            height: 'calc(100vh - 60px)',
            overflowY: 'auto',
            '::-webkit-scrollbar': {
              width: 5,
            },
            '::-webkit-scrollbar-thumb': {
              bgcolor: theme.palette.background.paper,
            },
          }}
        >
          {isLoading ? (
            <Loading />
          ) : (
            notifications.map((notification, index) => (
              <NotificationItem
                key={notification._id}
                notification={notification}
                selected={selected === index}
                onClick={() => {
                  handleSeenNotification(index);
                }}
              />
            ))
          )}
        </Stack>
      </Stack>
      {selected !== null && (
        <NotificationDetails
          notification={notifications[selected]}
          handleDelete={() => {
            handleDeleteNotification(notifications[selected]._id);
          }}
        />
      )}
    </Stack>
  );
};

export default Notification;