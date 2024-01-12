import { Badge, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { LiaUserFriendsSolid } from 'react-icons/lia';
import { IoMailOutline, IoPeopleOutline, IoPersonAddOutline } from 'react-icons/io5';
import { HiOutlineUserGroup } from 'react-icons/hi2';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openAddFriendDialog, setFriendsbar } from '../../store/slices/appSlice';
import { stateType } from '../../store/interface';
import { useEffect, useState } from 'react';
import { NewGroupDialog } from '../../components/dialog/NewGroupDialog';

const Action = [
  {
    icon: <LiaUserFriendsSolid size={21} />,
    name: 'My Friends',
  },
  {
    icon: <HiOutlineUserGroup size={21} />,
    name: 'My Groups',
  },
  {
    icon: <IoMailOutline size={21} />,
    name: 'Friend Requests',
  },
];
const Contacts = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { friendsbar } = useSelector((state: stateType) => state.app);
  const { receiveTotal } = useSelector((state: stateType) => state.relationship);
  const theme = useTheme();
  const [openNewGroup, setOpenNewGroup] = useState<boolean>(false);

  // handle
  const handleFriendsAction = (index) => {
    dispatch(setFriendsbar(index));
  };
  const handleOpenAddFriend = () => {
    dispatch(openAddFriendDialog());
  };

  // effect
  useEffect(() => {
    switch (friendsbar.index) {
      case 0:
        navigate('/contacts/friends');
        break;
      case 1:
        navigate('/contacts/groups');
        break;
      case 2:
        navigate('/contacts/friend-request');
        break;
      default:
        break;
    }
  }, [friendsbar, dispatch, navigate]);
  return (
    <Stack direction="row" sx={{ width: '100%' }}>
      <Stack
        sx={{
          position: 'relative',
          width: 320,
          backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.paper,
          boxShadow: '0px 0px 2px rgba(0,0,0,.2)',
        }}
      >
        <Stack px={3} py={2} spacing={2} sx={{ height: '100vh' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Contacts</Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton onClick={handleOpenAddFriend}>
                <IoPersonAddOutline size={20} />
              </IconButton>
              <IconButton
                onClick={() => {
                  setOpenNewGroup(true);
                }}
              >
                <IoPeopleOutline size={22} />
              </IconButton>
            </Stack>
          </Stack>
          <Stack spacing={1.2}>
            {Action.map((item, index) => {
              return (
                <Stack
                  key={index}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  p={2}
                  sx={{
                    bgcolor: index === friendsbar.index ? theme.palette.primary.main : theme.palette.background.default,
                    borderRadius: 1,
                    color: index === friendsbar.index ? '#fff' : theme.palette.text.primary,
                  }}
                  onClick={() => {
                    handleFriendsAction(index);
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    {item.icon}
                    <Typography variant="body1">{item.name}</Typography>
                  </Stack>
                  <Badge badgeContent={index == 2 ? receiveTotal : 0} color="primary" />
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </Stack>
      <Outlet />
      {openNewGroup && (
        <NewGroupDialog
          open={openNewGroup}
          handleClose={() => {
            setOpenNewGroup(false);
          }}
        />
      )}
    </Stack>
  );
};

export default Contacts;
