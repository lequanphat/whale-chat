import { Avatar, Box, Divider, IconButton, Menu, MenuItem, Stack, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { RiSettings3Line } from 'react-icons/ri';
import CustomSwitch from '../../components/switch/CustomSwitch';
import avatar from '../../assets/avatar_4.jpg';
import { Nav_Buttons, Profile_Menu } from '../../data';
import useSettings from '../../hooks/useSettings';
const Sidebar = () => {
    const [selected, setSelected] = useState(0);
    const theme = useTheme();
    const { onToggleMode } = useSettings();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.SyntheticEvent) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                            backgroundColor: theme.palette.primary.main,
                            height: 50,
                            width: 50,
                            borderRadius: 1.5,
                            overflow: 'hidden',
                        }}
                    >
                        <img src={avatar} alt="logo" style={{ objectFit: 'contain' }} />
                    </Box>
                    <Stack spacing={3} sx={{ width: 'max-content' }} direction="column" alignItems="center">
                        {Nav_Buttons.map((item) =>
                            item.index === selected ? (
                                <Box
                                    key={item.index}
                                    sx={{ backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }}
                                >
                                    {' '}
                                    <IconButton
                                        sx={{
                                            width: 'max-content',
                                            color: '#fff',
                                        }}
                                        key={item.index}
                                    >
                                        {item.icon}
                                    </IconButton>
                                </Box>
                            ) : (
                                <IconButton
                                    key={item.index}
                                    sx={{
                                        width: 'max-content',
                                        color: theme.palette.mode === 'light' ? theme.palette.text.primary : '#fff',
                                    }}
                                    onClick={() => {
                                        setSelected(item.index);
                                    }}
                                >
                                    {item.icon}
                                </IconButton>
                            ),
                        )}
                        <Divider sx={{ width: '48px' }} />
                        {selected === 3 ? (
                            <Box sx={{ backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }}>
                                {' '}
                                <IconButton
                                    sx={{
                                        width: 'max-content',
                                        color: '#fff',
                                    }}
                                >
                                    <RiSettings3Line />
                                </IconButton>
                            </Box>
                        ) : (
                            <IconButton
                                onClick={() => {
                                    setSelected(3);
                                }}
                                sx={{
                                    width: 'max-content',
                                    color: theme.palette.mode === 'light' ? theme.palette.text.primary : '#fff',
                                }}
                            >
                                <RiSettings3Line />
                            </IconButton>
                        )}
                    </Stack>
                </Stack>
                <Stack alignItems="center" spacing={2}>
                    <CustomSwitch onChange={onToggleMode} />
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
                                    <MenuItem key={index}>
                                        <Stack
                                            width={100}
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
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

export default Sidebar;
