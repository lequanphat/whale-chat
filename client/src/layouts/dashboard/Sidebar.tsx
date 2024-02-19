import { Avatar, Badge, Box, Divider, IconButton, Menu, MenuItem, Stack, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomSwitch from '../../components/switch/CustomSwitch';
import logo from '../../assets/logo.png';
import { Profile_Menu } from '../../data';
import useSettings from '../../hooks/useSettings';
import { resetUser } from '../../store/slices/authSlice';
import { resetAppSlice } from '../../store/slices/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { resetChatSlice } from '../../store/slices/chatSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoChatbubbleEllipsesOutline, IoLogoReddit, IoNotificationsOutline, IoPeopleOutline } from 'react-icons/io5';
import { getAllNotifications, resetNotificationSlice } from '../../store/slices/notificationSlice';
import { getAllFriendRequests, resetRelationshipSlice } from '../../store/slices/relationshipSlice';
import { stateType } from '../../store/types';
const Sidebar = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { avatar } = useSelector((state: stateType) => state.auth);
  const { unseenMessage } = useSelector((state: stateType) => state.chat);
  const { unseen } = useSelector((state: stateType) => state.notifications);
  const { receiveTotal } = useSelector((state: stateType) => state.relationship);
  const theme = useTheme();
  const { onToggleMode } = useSettings();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // useEffect
  useEffect(() => {
    (async () => {
      dispatch(getAllNotifications());
      dispatch(getAllFriendRequests());
    })();
  }, [dispatch]);

  // handle
  const handleClick = (event: React.SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    dispatch(resetChatSlice());
    dispatch(resetAppSlice());
    dispatch(resetUser());
    dispatch(resetNotificationSlice());
    dispatch(resetRelationshipSlice());
    window.localStorage.removeItem('accessToken');
  };
  const handleAccountManager = (index) => {
    switch (index) {
      case 0:
        navigate('/profile');
        break;
      case 1:
        navigate('/settings');
        break;
      case 2:
        handleLogout();
        break;

      default:
        break;
    }
    setAnchorEl(null);
  };

  // render
  return (
    <Box
      p={2}
      sx={{
        backgroundColor: theme.palette.background.default,
        boxShadow: '0px 0px 2px rgba(0,0,0, .25)',
        height: '100vh',
        width: 80,
      }}
    >
      <Stack direction="column" alignItems="center" justifyContent="space-between" height="100%" spacing={3}>
        <Stack alignItems="center" spacing={4}>
          <Box
            sx={{
              height: 54,
              width: 54,
              borderRadius: 1.5,
              overflow: 'hidden',
            }}
            onClick={() => {
              window.location.reload();
            }}
          >
            <img src={logo} alt="logo" />
          </Box>
          <Stack spacing={3} sx={{ width: 'max-content' }} direction="column" alignItems="center">
            <SidebarItem href={'/app/chat'} icon={<IoChatbubbleEllipsesOutline />} badgeContent={unseenMessage} />
            <SidebarItem href={'/contacts/friends'} icon={<IoPeopleOutline />} badgeContent={receiveTotal} />
            <SidebarItem href={'/gpt'} icon={<IoLogoReddit />} badgeContent={0} />
            <Divider sx={{ width: '48px' }} />
            <SidebarItem href={'/notifications'} icon={<IoNotificationsOutline />} badgeContent={unseen} />
          </Stack>
        </Stack>
        <Stack alignItems="center" spacing={2}>
          <CustomSwitch onChange={onToggleMode} checked={theme.palette.mode === 'light' ? false : true} />
          <Avatar src={avatar} alt="temp" onClick={handleClick} />
          <Menu
            id="basic-menu-2"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button-2',
            }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Stack spacing={1} px={1}>
              {Profile_Menu.map((item, index) => {
                return (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      handleAccountManager(index);
                    }}
                  >
                    <Stack width={100} direction="row" justifyContent="space-between" alignItems="center">
                      <span>{item.title}</span>
                      {item.icon}
                    </Stack>
                  </MenuItem>
                );
              })}
            </Stack>
          </Menu>
        </Stack>
      </Stack>
    </Box>
  );
};

const SidebarItem = ({ href, icon, badgeContent }) => {
  const theme = useTheme();
  return (
    <NavLink to={href}>
      {({ isActive }) => (
        <Box
          sx={isActive ? { bgcolor: theme.palette.primary.main, color: '#fff' } : { color: theme.palette.text.primary }}
          borderRadius={1}
        >
          <IconButton
            sx={{
              width: 'max-content',
              color: 'inherit',
            }}
          >
            <Badge badgeContent={badgeContent} max={5} color="primary">
              {icon}
            </Badge>
          </IconButton>
        </Box>
      )}
    </NavLink>
  );
};

export default Sidebar;
