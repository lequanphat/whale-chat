import { Box, Button, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { IoPersonAddOutline } from 'react-icons/io5';
import { CiSearch } from 'react-icons/ci';
import { Search, SearchIconWrapper, StyledInputBase } from '../input/SearchInput';
import { MdOutlineArchive } from 'react-icons/md';
import ChatElement from './ChatElement';
import { Scrollbar } from '../scrollbar/Scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { stateType } from '../../store/interface';
import { getAllContacts, getMessages, setCurrentContact } from '../../store/slices/chatSlice';
import Loading from '../loading/Loading';

const Chats = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dispatch = useDispatch<any>();
    const theme = useTheme();
    const { id } = useSelector((state: stateType) => state.auth);
    const { contacts, currentContact, isLoading } = useSelector((state: stateType) => state.chat);

    useEffect(() => {
        dispatch(getAllContacts({ id }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSetCurrentChat = async (index: number) => {
        await dispatch(setCurrentContact({ index }));
        await dispatch(getMessages({ userId: id, contactId: contacts[index]._id }));
    };

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
                        <IoPersonAddOutline size={20} />
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
                    <Stack direction="row" alignItems="center" spacing={0.4}>
                        <MdOutlineArchive size={22} />
                        <Button>Archive</Button>
                    </Stack>
                    <Divider />
                </Stack>
                <Scrollbar direction="column" sx={{ flexGrow: 1, overflow: 'auto', height: '100%' }} spacing={2}>
                    {isLoading ? (
                        <Loading />
                    ) : (
                        <>
                            <Stack spacing={1.6}>
                                <Typography variant="subtitle2" sx={{ color: '#676767' }}>
                                    Pinned
                                </Typography>
                                {contacts.map((item, index) => {
                                    return (
                                        <ChatElement
                                            key={item._id}
                                            {...item}
                                            selected={currentContact === index}
                                            online={item.status==='online'}
                                            onClick={() => {
                                                handleSetCurrentChat(index);
                                            }}
                                        />
                                    );
                                })}
                            </Stack>
                            <Stack spacing={1.6}>
                                <Typography variant="subtitle2" sx={{ color: '#676767' }}>
                                    All Chats
                                </Typography>
                            </Stack>
                        </>
                    )}
                </Scrollbar>
            </Stack>
        </Box>
    );
};

export default Chats;
