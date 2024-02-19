import { Avatar, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { Scrollbar } from '../../components/scrollbar/Scrollbar';
import { GoChevronLeft, GoBell } from 'react-icons/go';
import {
  IoBagOutline,
  IoKeyOutline,
  IoColorPaletteOutline,
  IoAlertCircleOutline,
  IoImageOutline,
  IoAccessibilityOutline,
} from 'react-icons/io5';
import { CiKeyboard } from 'react-icons/ci';
import React, { useMemo, useState } from 'react';
import ShortCuts from '../../components/dialog/ShortCuts';
import { useSelector } from 'react-redux';
import { stateType } from '../../store/types';
import { NavLink } from 'react-router-dom';
interface SettingsType {
  key: number;
  icon: React.ReactElement;
  title: string;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default function Settings() {
  const theme = useTheme();
  const { avatar, displayName, email } = useSelector((state: stateType) => state.auth);
  const [openShortcuts, setOpenShortcuts] = useState(false);
  const handleOpenShortcuts = () => {
    setOpenShortcuts(true);
  };
  const handleCloseShortcuts = () => {
    setOpenShortcuts(false);
  };
  const Settings_List: SettingsType[] = useMemo(
    () => [
      {
        key: 0,
        icon: <GoBell size={19} />,
        title: 'Notifications',
        onClick: () => {},
      },
      {
        key: 1,
        icon: <IoBagOutline size={19} />,
        title: 'Privacy',
        onClick: () => {},
      },
      {
        key: 2,
        icon: <IoKeyOutline size={20} />,
        title: 'Security',
        onClick: () => {},
      },
      {
        key: 3,
        icon: <IoColorPaletteOutline size={20} />,
        title: 'Theme',
        onClick: () => {},
      },
      {
        key: 4,
        icon: <IoImageOutline size={20} />,
        title: 'Chat Wallpaper',
        onClick: () => {},
      },
      {
        key: 5,
        icon: <IoAccessibilityOutline size={20} />,
        title: 'Request Account Info',
        onClick: () => {},
      },
      {
        key: 6,
        icon: <CiKeyboard size={20} />,
        title: 'Keyboarch Shortcuts',
        onClick: handleOpenShortcuts,
      },
      {
        key: 7,
        icon: <IoAlertCircleOutline size={20} />,
        title: 'Help',
        onClick: () => {},
      },
    ],
    [],
  );
  return (
    <>
      <Stack direction="row" width="100%">
        {/* Left Panel  */}
        <Scrollbar
          sx={{
            height: '100vh',
            width: 320,
            backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.default,
            boxShadow: '0px 0px 2px rgba(0,0,0,.25)',
          }}
        >
          {/* Header  */}
          <Stack direction="row" alignItems="center" p={1} spacing={0.4}>
            <NavLink to="/app/chat">
              <IconButton>
                <GoChevronLeft />
              </IconButton>
            </NavLink>
            <Typography variant="h6">Settings</Typography>
          </Stack>
          <Stack p={3.2} spacing={5}>
            {/* Settings  */}
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ width: 54, height: 54 }} src={avatar} alt="avatar" />
              <Stack spacing={0.2} flex={1}>
                <Typography variant="subtitle1">{displayName}</Typography>
                <Typography
                  variant="body1"
                  fontSize={14}
                  sx={{
                    maxWidth: '200px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {email}
                </Typography>
              </Stack>
            </Stack>
            <Stack spacing={4}>
              {Settings_List.map((item, index) => {
                return (
                  <Stack key={index} spacing={2} sx={{ cursor: 'pointer' }} onClick={item.onClick}>
                    <Stack direction="row" alignItems="center" spacing={1.6}>
                      {item.icon}
                      <Typography variant="caption">{item.title}</Typography>
                    </Stack>
                    {item.key !== 7 && <Divider />}
                  </Stack>
                );
              })}
            </Stack>
          </Stack>
        </Scrollbar>
        {/* Right Panel  */}
      </Stack>
      {openShortcuts && <ShortCuts open={openShortcuts} handleClose={handleCloseShortcuts} />}
    </>
  );
}
