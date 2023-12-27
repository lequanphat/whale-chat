import { Stack, Typography, useTheme } from '@mui/material';
import { LiaUserFriendsSolid } from 'react-icons/lia';
import { IoMailOutline } from 'react-icons/io5';
import { HiOutlineUserGroup } from 'react-icons/hi2';
import { useState } from 'react';

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
const Friends = () => {
    const theme = useTheme();
    const [selected, setSelected] = useState<number>(0);
    const handleFriendsAction = (index) => {
        setSelected(index);
    };
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
                    <Typography variant="h6">Friends & Contacts</Typography>
                    <Stack spacing={1.2}>
                        {Action.map((item, index) => {
                            return (
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={1}
                                    p={1.4}
                                    sx={{
                                        bgcolor:
                                            index === selected
                                                ? theme.palette.primary.main
                                                : theme.palette.background.default,
                                        borderRadius: 1,
                                        color: index === selected ? '#fff' : theme.palette.text.primary,
                                    }}
                                    onClick={() => {
                                        handleFriendsAction(index);
                                    }}
                                >
                                    {item.icon}
                                    <Typography variant="body1">{item.name}</Typography>
                                </Stack>
                            );
                        })}
                    </Stack>
                </Stack>
            </Stack>
            <Stack flexGrow={1}>
                <Stack
                    flexDirection="row"
                    alignItems="center"
                    sx={{
                        height: 70,
                        width: '100%',
                        backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.paper,
                        boxShadow: '0px 0px 2px rgba(0,0,0, .25)',
                    }}
                    p={2}
                >
                    <Typography variant="body2">My Friends (116) </Typography>
                </Stack>
                <Stack></Stack>
            </Stack>
        </Stack>
    );
};

export default Friends;
