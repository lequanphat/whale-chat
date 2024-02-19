import { Badge, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { LiaUserFriendsSolid } from 'react-icons/lia';
import { IoMailOutline, IoPeopleOutline, IoPersonAddOutline } from 'react-icons/io5';
import { HiOutlineUserGroup } from 'react-icons/hi2';
import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openAddFriendDialog } from '../../store/slices/appSlice';
import { stateType } from '../../store/interface';
import { useState } from 'react';
import { NewGroupDialog } from '../../components/dialog/NewGroupDialog';

const Contacts = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const { receiveTotal } = useSelector((state: stateType) => state.relationship);
  const theme = useTheme();
  const [openNewGroup, setOpenNewGroup] = useState<boolean>(false);

  const handleOpenAddFriend = () => {
    dispatch(openAddFriendDialog());
  };

  // effect

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
        <Stack py={2} spacing={2} sx={{ height: '100vh' }}>
          <Stack px={3} direction="row" justifyContent="space-between" alignItems="center">
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
          <Stack>
            <NavItem
              href={'/contacts/friends'}
              icon={<LiaUserFriendsSolid size={21} />}
              title={'Friends'}
              badgeContent={0}
            />
            <NavItem
              href={'/contacts/groups'}
              icon={<HiOutlineUserGroup size={21} />}
              title={'Groups'}
              badgeContent={0}
            />
            <NavItem
              href={'/contacts/friend-request'}
              icon={<IoMailOutline size={21} />}
              title={'Friend Requests'}
              badgeContent={receiveTotal}
            />
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

export const NavItem = ({ href, icon, title, badgeContent }) => {
  const theme = useTheme();
  return (
    <NavLink to={href}>
      {({ isActive }) => (
        <Stack
          sx={
            isActive
              ? { bgcolor: theme.palette.primary.main, color: '#fff' }
              : { color: theme.palette.text.primary, ':hover': { bgcolor: theme.palette.background.paper } }
          }
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          p={2}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            {icon}
            <Typography variant="body1">{title}</Typography>
          </Stack>
          <Badge badgeContent={badgeContent} color="primary" />
        </Stack>
      )}
    </NavLink>
  );
};

export default Contacts;
