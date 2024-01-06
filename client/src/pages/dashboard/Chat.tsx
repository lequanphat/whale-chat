import { Box, Stack, useTheme } from '@mui/material';
import Contact from '../../components/contacts/Contact';
import SharedMessages from '../../components/contacts/SharedMessages';
import { useDispatch, useSelector } from 'react-redux';
import { stateType } from '../../store/interface';
import ChatHeader from '../../components/chat/ChatHeader';
import Message from '../../components/chat/Message';
import ChatFooter from '../../components/chat/ChatFooter';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMessages, setCurrentContact } from '../../store/slices/chatSlice';

export const Chat = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { sidebar } = useSelector((state: stateType) => state.app);
  const { contacts, chats } = useSelector((state: stateType) => state.chat);
  const { chatId } = useParams();
  const theme = useTheme();
  const [currentMessages, setCurrentMessages] = useState<object[]>([]);

  useEffect(() => {
    const result = contacts.findIndex((contact) => contact.contact._id === chatId);
    if (result === -1) {
      dispatch(setCurrentContact(null));
      navigate('/app/chat');
    } else {
      dispatch(setCurrentContact(result));
      const chat = chats.findIndex((item) => item.id === chatId);
      if (chat === -1) {
        dispatch(getMessages(chatId));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId, contacts]);

  // set current messages

  useEffect(() => {
    const chat = chats.find((value) => value.id === chatId);
    if (chat) {
      setCurrentMessages(chat.messages);
    }
  }, [chatId, chats]);
  return (
    <>
      <Box
        flexGrow={1}
        sx={{
          height: '100%',
          backgroundColor: theme.palette.mode === 'light' ? '#fff' : theme.palette.background.default,
        }}
      >
        <Stack height="100%" maxHeight="100vh" width="100%">
          <ChatHeader />
          {/* chat messages */}

          <Message currentMessages={currentMessages} />
          <ChatFooter />
        </Stack>
      </Box>
      {sidebar.open &&
        (() => {
          switch (sidebar.type) {
            case 'CONTACT':
              return <Contact currentMessages={currentMessages} />;
            case 'STARRED':
              return <Contact currentMessages={currentMessages} />;
            case 'SHARED':
              return <SharedMessages currentMessages={currentMessages} />;
            default:
              return <></>;
          }
        })()}
    </>
  );
};
