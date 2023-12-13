import { Avatar, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { Scrollbar } from '../../components/scrollbar/Scrollbar';
import { GoChevronLeft } from 'react-icons/go';
import { IoBagOutline, IoKeyOutline, IoColorPaletteOutline } from 'react-icons/io5';
import { faker } from '@faker-js/faker';
import React from 'react';
import ShortCuts from '../../components/dialog/ShortCuts';
interface SettingsType {
    key: number;
    icon: React.ReactElement;
    title: string;
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
const Settings_List: SettingsType[] = [
    {
        key: 0,
        icon: <GoChevronLeft size={20} />,
        title: 'Notifications',
        onClick: () => {},
    },
    {
        key: 1,
        icon: <IoBagOutline size={20} />,
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
        icon: <GoChevronLeft />,
        title: 'Chat Wallpaper',
        onClick: () => {},
    },
    {
        key: 5,
        icon: <GoChevronLeft />,
        title: 'Request Account Info',
        onClick: () => {},
    },
    {
        key: 6,
        icon: <GoChevronLeft />,
        title: 'Keyboarch Shortcuts',
        onClick: () => {},
    },
    {
        key: 7,
        icon: <GoChevronLeft />,
        title: 'Help',
        onClick: () => {},
    },
];
export default function Settings() {
    const theme = useTheme();
    return (
        <>
            <Stack direction="row" width="100%">
                {/* Left Panel  */}
                <Scrollbar
                    scrollbar
                    sx={{
                        height: '100vh',
                        width: 320,
                        backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.default,
                        boxShadow: '0px 0px 2px rgba(0,0,0,.25)',
                    }}
                >
                    <Stack p={3.2} spacing={5}>
                        {/* Header  */}
                        <Stack direction="row" alignItems="center" spacing={0.4}>
                            <IconButton>
                                <GoChevronLeft />
                            </IconButton>
                            <Typography variant="h6">Settings</Typography>
                        </Stack>
                        {/* Profile  */}
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar
                                sx={{ width: 54, height: 54 }}
                                src={faker.image.url()}
                                alt={faker.person.fullName()}
                            />
                            <Stack spacing={0.2}>
                                <Typography variant="body2">{faker.person.fullName()}</Typography>
                                <Typography variant="subtitle2">{faker.word.adverb()}</Typography>
                            </Stack>
                        </Stack>
                        <Stack spacing={4}>
                            {Settings_List.map((item) => {
                                return (
                                    <>
                                        <Stack
                                            key={item.key}
                                            spacing={2}
                                            sx={{ cursor: 'pointer' }}
                                            onClick={item.onClick}
                                        >
                                            <Stack direction="row" alignItems="center" spacing={1.6}>
                                                {item.icon}
                                                <Typography variant="caption">{item.title}</Typography>
                                            </Stack>
                                            {item.key !== 7 && <Divider />}
                                        </Stack>
                                    </>
                                );
                            })}
                        </Stack>
                    </Stack>
                </Scrollbar>
                {/* Right Panel  */}
            </Stack>
            <ShortCuts open={true} handleClose={() => {}} />
        </>
    );
}
