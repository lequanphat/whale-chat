import { useTheme } from '@emotion/react';
import { Avatar, Box, Button, Divider, IconButton, Stack, Switch, Typography } from '@mui/material';
import { RxCaretRight } from 'react-icons/rx';
import { IoCloseOutline } from "react-icons/io5";
import { FaRegStar } from 'react-icons/fa';
import { PiPhoneLight } from 'react-icons/pi';
import { MdBlock } from "react-icons/md";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { ToggleSidebar } from '../../store/slices/appSlice';
import avatar from '../../assets/quanphat.jpg';
import { IoVideocamOutline } from 'react-icons/io5';
import { faker } from '@faker-js/faker';
import { Scrollbar } from '../scrollbar/Scrollbar';

function Contact() {
    const theme = useTheme();
    const dispath = useDispatch();
    return (
        <Stack width={320} height="100%">
            <Box
                sx={{
                    width: '100%',
                    boxShadow: '0px 0px 2px rgba(0,0,0,.25)',
                    backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background,
                }}
            >
                <Stack direction="row" height={70} alignItems="center" justifyContent="space-between" spacing={3} p={2}>
                    <Typography variant="subtitle2">Contact Info</Typography>
                    <IconButton
                        onClick={() => {
                            dispath(ToggleSidebar());
                        }}
                    >
                        <IoCloseOutline />
                    </IconButton>
                </Stack>
            </Box>
            <Scrollbar scrollbar height={'calc(100vh - 70px)'} sx={{ flexGrow: 1 }} p={3} spacing={3}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar src={avatar} alt="avt" sx={{ width: 52, height: 52 }} />
                    <Stack spacing={0}>
                        <Typography variant="article">Quan Phat</Typography>
                        <Typography variant="caption">0383642670</Typography>
                    </Stack>
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-evenly">
                    <Stack direction="column" alignItems="center">
                        <IconButton>
                            <PiPhoneLight />
                        </IconButton>
                        <Typography variant="body1">Voice</Typography>
                    </Stack>
                    <Stack direction="column" alignItems="center">
                        <IconButton>
                            <IoVideocamOutline />
                        </IconButton>
                        <Typography variant="body1">Video</Typography>
                    </Stack>
                </Stack>
                <Divider />
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle2">Media, Links and Docs</Typography>
                    <IconButton>
                        <RxCaretRight size={26} />
                    </IconButton>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={2}>
                    {[1, 2, 3].map((item) => {
                        return (
                            <Box>
                                <img src={faker.image.food()} alt={faker.name.fullName()} />
                            </Box>
                        );
                    })}
                </Stack>
                <Divider />
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <FaRegStar />
                        <Typography variant="subtitle2">Starred Messages</Typography>
                    </Stack>
                    <IconButton>
                        <RxCaretRight size={26} />
                    </IconButton>
                </Stack>
                <Divider />
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <IoMdNotificationsOutline size={22} />
                        <Typography variant="subtitle2">Mute Notification</Typography>
                    </Stack>
                    <Switch inputProps={{ 'aria-label': 'controlled' }} />
                </Stack>
                <Divider />
                <Typography variant="body1">2 group in common</Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={faker.image.food()} alt={faker.name.fullName()} />
                    <Stack>
                        <Typography variant="subtitle2">Coding Monk</Typography>
                        <Typography variant="caption">16 members</Typography>
                    </Stack>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={faker.image.food()} alt={faker.name.fullName()} />
                    <Stack>
                        <Typography variant="subtitle2">Coding Monk</Typography>
                        <Typography variant="caption">16 members</Typography>
                    </Stack>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Button startIcon={<MdBlock />} variant="outlined" fullWidth>
                        Block
                    </Button>
                    <Button startIcon={<RiDeleteBin6Line />} variant="outlined" fullWidth>
                        Delete
                    </Button>
                </Stack>
            </Scrollbar>
        </Stack>
    );
}

export default Contact;
