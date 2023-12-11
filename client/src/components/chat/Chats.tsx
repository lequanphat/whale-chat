import { Box, Button, Divider, IconButton, Stack, Typography } from '@mui/material';
import { IoAlertCircleOutline } from 'react-icons/io5';
import { CiSearch } from 'react-icons/ci';
import { Search, SearchIconWrapper, StyledInputBase } from '../input/SearchInput';
import { MdOutlineArchive } from 'react-icons/md';
import ChatElement from './ChatElement';
import { ChatList } from '../../data';
import { Scrollbar } from '../scrollbar/Scrollbar';
import { useTheme } from '@emotion/react';
const Chats = () => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                position: 'relative',
                width: 320,
                backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.paper,
                boxShadow: '0px 0px 2px rgba(0,0,0,.2)',
            }}
        >
            <Stack px={3} py={2} spacing={2} sx={{ height: '100vh' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Chats</Typography>
                    <IconButton>
                        <IoAlertCircleOutline />
                    </IconButton>
                </Stack>
                <Stack sx={{ width: '100%' }}>
                    <Search>
                        <SearchIconWrapper>
                            <CiSearch size={18} />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder="Search..." inputProps={{ 'aria-label': 'search' }} />
                    </Search>
                </Stack>
                <Stack spacing={1}>
                    <Stack direction="row" alignItems="center" spacing={.4}>
                        <MdOutlineArchive size={22} />
                        <Button>Archive</Button>
                    </Stack>
                    <Divider />
                </Stack>
                <Scrollbar  scrollbar direction="column" sx={{ flexGrow: 1, overflow: 'auto', height: '100%' }} spacing={2}>
                    <Stack spacing={1.6}>
                        <Typography variant="subtitle2" sx={{ color: '#676767' }}>
                            Pinned
                        </Typography>
                        {ChatList.filter((item) => item.pinned).map((item) => {
                            return <ChatElement key={item.id} {...item} />;
                        })}
                    </Stack>
                    <Stack spacing={1.6}>
                        <Typography variant="subtitle2" sx={{ color: '#676767' }}>
                            All Chats
                        </Typography>
                        {ChatList.filter((item) => !item.pinned).map((item, index) => {
                            return <ChatElement key={index} {...item} />;
                        })}
                    </Stack>
                </Scrollbar>
            </Stack>
        </Box>
    );
};

export default Chats;
