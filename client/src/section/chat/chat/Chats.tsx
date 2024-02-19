import { Box, Button, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { IoPersonAddOutline } from 'react-icons/io5';
import { CiSearch } from 'react-icons/ci';
import { Search, SearchIconWrapper, StyledInputBase } from '../../../components/input/SearchInput';
import { MdOutlineArchive } from 'react-icons/md';
import ChatElement from './ChatElement';
import { Scrollbar } from '../../../components/scrollbar/Scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllContacts, seenMessages } from '../../../store/slices/chatSlice';
import Loading from '../../../components/loading/Loading';
import { useNavigate } from 'react-router-dom';
import { openAddFriendDialog } from '../../../store/slices/appSlice';
import { useSocket } from '../../../hooks/useSocket';
import { ContactType, stateType } from '../../../store/types';
const Chats = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const theme = useTheme();
  const navigate = useNavigate();
  const { emitJoinGroup } = useSocket();
  const [searchText, setSearchText] = useState<string>('');

  const { contacts, currentContact, isLoading } = useSelector((state: stateType) => state.chat);
  const contactsList = [...contacts];
  useEffect(() => {
    (async () => {
      const response = await dispatch(getAllContacts());
      if (response.payload.contacts) {
        response.payload.contacts.forEach((contact) => {
          if (contact.contact.type !== ContactType.USER) {
            emitJoinGroup(contact.contact._id);
          }
        });
      }
    })();
  }, [dispatch]);

  const handlePickContact = async ({ id, total }: { id: string; total: number }) => {
    navigate(`/app/chat/${id}`);
    if (total !== 0) {
      dispatch(seenMessages(id));
    }
  };

  const handleOpenAddFriends = () => {
    dispatch(openAddFriendDialog());
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
          <IconButton onClick={handleOpenAddFriends}>
            <IoPersonAddOutline size={20} />
          </IconButton>
        </Stack>
        <Stack sx={{ width: '100%' }}>
          <Search>
            <SearchIconWrapper>
              <CiSearch size={18} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
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
                  All Chats
                </Typography>
                {contactsList.length ? (
                  <>
                    {searchText
                      ? contactsList
                          .filter((contact) =>
                            contact.contact.displayName.toLowerCase().includes(searchText.toLowerCase()),
                          )
                          .sort((a, b) => {
                            const dateA = new Date(a.recentMessage.createdAt).getTime();
                            const dateB = new Date(b.recentMessage.createdAt).getTime();
                            return dateB - dateA;
                          })
                          .map((item) => {
                            return (
                              <ChatElement
                                key={item.contact._id}
                                contact={item.contact}
                                selected={currentContact?._id === item.contact._id}
                                recentMessages={item.recentMessage}
                                unseen={item.total}
                                onClick={() => {
                                  handlePickContact({ id: item.contact._id, total: item.total });
                                }}
                              />
                            );
                          })
                      : contactsList
                          .sort((a, b) => {
                            const dateA = new Date(a.recentMessage.createdAt).getTime();
                            const dateB = new Date(b.recentMessage.createdAt).getTime();
                            return dateB - dateA;
                          })
                          .map((item) => {
                            return (
                              <ChatElement
                                key={item.contact._id}
                                selected={currentContact?._id === item.contact._id}
                                contact={item.contact}
                                recentMessages={item.recentMessage}
                                unseen={item.total}
                                onClick={() => {
                                  handlePickContact({ id: item.contact._id, total: item.total });
                                }}
                              />
                            );
                          })}
                  </>
                ) : (
                  <Stack alignItems="center" justifyContent="center">
                    <Typography variant="body1" mb={1.6}>
                      You have no friends
                    </Typography>
                    <Button variant="contained" sx={{ fontSize: 12, px: 2, py: 0.8 }} onClick={handleOpenAddFriends}>
                      Add friends
                    </Button>
                  </Stack>
                )}
              </Stack>
              <Stack spacing={1.6}></Stack>
            </>
          )}
        </Scrollbar>
      </Stack>
    </Box>
  );
};

export default Chats;
