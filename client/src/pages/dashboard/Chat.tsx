import { Box, Stack, useTheme } from '@mui/material';
import ContactInfo from '../../section/chat/contact_info/ContactInfo';
import SharedMessages from '../../section/chat/contact_info/SharedMessages';
import { useDispatch, useSelector } from 'react-redux';
import ChatHeader from '../../section/chat/chat/ChatHeader';
import Message from '../../section/chat/message/Message';
import ChatFooter from '../../section/chat/chat/ChatFooter';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMessages, setCurrentContact } from '../../store/slices/chatSlice';
import { stateType } from '../../store/types';

export const Chat = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { contactbar } = useSelector((state: stateType) => state.app);
  const { contacts, chats } = useSelector((state: stateType) => state.chat);
  const { chatId } = useParams();
  const theme = useTheme();
  const [currentMessages, setCurrentMessages] = useState<object[]>([]);

  // effect
  useEffect(() => {
    const result = contacts.findIndex((contact) => contact.contact._id === chatId);
    if (result === -1) {
      dispatch(setCurrentContact(null));
      navigate('/app/chat');
    } else {
      dispatch(setCurrentContact(contacts[result].contact));
      const chat = chats.findIndex((item) => item.id === chatId);
      if (chat === -1) {
        dispatch(getMessages(chatId));
      }
    }
  }, [chatId, chats, contacts, dispatch, navigate]);

  // effect
  useEffect(() => {
    const chat = chats.find((value) => value.id === chatId);
    if (chat) {
      setCurrentMessages(chat.messages);
    }
  }, [chatId, chats]);

  // render
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
          <Message currentMessages={currentMessages} />
          <ChatFooter />
        </Stack>
      </Box>
      {contactbar.open &&
        (() => {
          switch (contactbar.type) {
            case 'CONTACT':
              return <ContactInfo currentMessages={currentMessages} />;
            case 'STARRED':
              return <ContactInfo currentMessages={currentMessages} />;
            case 'SHARED':
              return <SharedMessages currentMessages={currentMessages} />;
            default:
              return <></>;
          }
        })()}
    </>
  );
};
