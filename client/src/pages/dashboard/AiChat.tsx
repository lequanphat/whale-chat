import { CircularProgress, IconButton, Stack, Typography, useTheme } from '@mui/material';
import StyledInput from '../../components/input/StyledInput';
import { IoSendSharp } from 'react-icons/io5';
import { Scrollbar } from '../../components/scrollbar/Scrollbar';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { OPENAI_KEY } from '../../config';
import { ChatHeader } from '../../section/aichats/ChatHeader';
import { AiMessage } from '../../section/aichats/AiMessage';

interface Message {
  content: string;
  role: string;
}

const AiChat = () => {
  const theme = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  // handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }
    setMessages([...messages, { role: 'user', content: text }]);
    //reset text
    setText('');
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://api.openai.com/v1/chat/completions`,
        {
          // model: 'gpt-3.5-turbo',
          model: 'gpt-3.5-turbo',
          messages: [...messages, { role: 'user', content: text }],
          temperature: 0.9,
          max_tokens: 150,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_KEY}`,
          },
        },
      );
      setMessages((pre) => [...pre, response.data.choices[0].message]);
    } catch (error) {
      setMessages((pre) => [...pre, { role: 'assistant', content: 'Something went wrong' }]);
    }
    setIsLoading(false);
  };

  // handle clear message
  const handleClearMessage = () => {
    setMessages([]);
  };

  // effect
  useEffect(() => {
    scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [scrollRef, messages]);

  // render
  return (
    <Stack direction="row" width="100%">
      <Stack
        sx={{
          position: 'relative',
          width: 320,
          backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.paper,
          boxShadow: '0px 0px 2px rgba(0,0,0,.2)',
        }}
      >
        <Stack px={3} py={2} spacing={2} sx={{ height: '100vh' }}>
          <Typography variant="h6">ChatGPT</Typography>
        </Stack>
      </Stack>
      <Stack height="100vh" flexGrow={1}>
        <ChatHeader handleOff={handleClearMessage} />
        <Stack flexGrow={1} maxHeight="calc(100vh - 79px)">
          <Scrollbar
            ref={scrollRef}
            sx={{
              flexGrow: 1,
              boxShadow: '0px 0px 2px rgba(0,0,0, .25)',
            }}
            p={2}
          >
            <Stack spacing={1.5}>
              {messages.map((message, index) => {
                return <AiMessage message={message} key={index} />;
              })}
              {isLoading && (
                <Stack direction="row" justifyContent="start">
                  <Stack
                    sx={{
                      backgroundColor: theme.palette.background.paper,
                      borderRadius: 1.8,
                      width: 'max-content',
                      p: '10px 16px',
                    }}
                  >
                    <CircularProgress size={22} />
                  </Stack>
                </Stack>
              )}
            </Stack>
          </Scrollbar>
        </Stack>
        <form onSubmit={handleSubmit}>
          <Stack p={2} direction="row" alignItems="center" spacing={1}>
            <StyledInput
              fullWidth
              variant="filled"
              placeholder="Message ChatGPT..."
              InputProps={{ disableUnderline: true }}
              onChange={(e) => {
                setText(e.target.value);
              }}
              value={text}
            />
            <Stack alignItems="center" justifyContent="center" sx={{ width: 46, height: 42 }}>
              <IconButton type="submit">
                {isLoading ? (
                  <CircularProgress size={22} />
                ) : (
                  <IoSendSharp color={theme.palette.primary.main} size={34} />
                )}
              </IconButton>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
};

export default AiChat;
