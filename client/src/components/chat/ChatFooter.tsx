import { Box, IconButton, Stack, useTheme } from '@mui/material';
import { IoCloseOutline, IoSendSharp } from 'react-icons/io5';
import ChatInput from './ChatInput';
import { useSocket } from '../../hooks/useSocket';
import { useDispatch, useSelector } from 'react-redux';
import { stateType } from '../../store/interface';
import { addDocMessage, addImageMessage, addTextMessage, addVoiceMessage } from '../../store/slices/chatSlice';
import { FormEvent, useState } from 'react';
import { openSnackbar } from '../../store/slices/appSlice';
import VoicePreview from './VoiceInput';
import { MessageType } from './types';

const ChatFooter = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const { currentContact } = useSelector((state: stateType) => state.chat);
  const [docFile, setDocFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [voiceFile, setVoiceFile] = useState(null);
  const [openVoice, setOpenVoice] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const { emitMessage } = useSocket();
  const theme = useTheme();

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (voiceFile) {
      console.log(voiceFile);
      const formData = new FormData();
      formData.append('audio', voiceFile.blob, 'recording.mp3');
      formData.append('to', currentContact._id);
      const response = await dispatch(addVoiceMessage(formData));
      // emit
      emitMessage(response.payload.data.message);
      // reset voice file
      setVoiceFile(null);
      return;
    }
    if (imageFile) {
      console.log(imageFile);
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('to', currentContact._id);
      formData.append('text', text);
      const response = await dispatch(addImageMessage(formData));
      const result = response.payload.data.messages;
      if (result) {
        emitMessage({
          type: MessageType.IMAGE,
          image: result[0].image,
          from: result[0].from,
          to: result[0].to,
          createdAt: result[0].createdAt,
        });
        emitMessage({
          type: MessageType.TEXT,
          text: result[1].text,
          from: result[1].from,
          to: result[1].to,
          createdAt: result[1].createdAt,
        });
      } else {
        emitMessage(response.payload.data.message);
      }

      setImageFile(null);
      setText('');
      return;
    }
    if (docFile) {
      console.log(docFile);
      const formData = new FormData();
      formData.append('doc', docFile);
      formData.append('to', currentContact._id);
      formData.append('text', text);
      const response = await dispatch(addDocMessage(formData));
      if (response.error) {
        dispatch(openSnackbar({ message: response.payload.error, serverity: 'error' }));
        return;
      }

      const result = response.payload.data.messages;
      if (result) {
        emitMessage({
          type: MessageType.DOC,
          text: result[0].text,
          doc: result[0].doc,
          from: result[0].from,
          to: result[0].to,
          createdAt: result[0].createdAt,
        });
        emitMessage({
          type: MessageType.TEXT,
          text: result[1].text,
          from: result[1].from,
          to: result[1].to,
          createdAt: result[1].createdAt,
        });
      } else {
        emitMessage(response.payload.data.message);
      }
      setDocFile(null);
      setText('');
      return;
    }
    if (text.trim() === '') {
      return;
    }
    const response = await dispatch(addTextMessage({ to: currentContact._id, text }));
    emitMessage(response.payload.message);
    setText('');
  };
  return (
    <Box
      p={2}
      sx={{
        width: '100%',
        backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.paper,
        boxShadow: '0px 0px 2px rgba(0,0,0, .25)',
      }}
    >
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          handleSendMessage(e);
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2} justifyContent="space-between">
          {openVoice ? (
            <VoicePreview voiceFile={voiceFile} setVoiceFile={setVoiceFile} />
          ) : (
            <ChatInput
              text={text}
              docFile={docFile}
              imageFile={imageFile}
              setDocFile={setDocFile}
              setImageFile={setImageFile}
              setText={setText}
              setOpenVoice={setOpenVoice}
            />
          )}

          {!openVoice || voiceFile ? (
            <Stack alignItems="center" justifyContent="center" sx={{ width: 46, height: 42 }}>
              <IconButton type="submit">
                <IoSendSharp color={theme.palette.primary.main} size={34} />
              </IconButton>
            </Stack>
          ) : (
            <Stack alignItems="center" justifyContent="center" sx={{ width: 46, height: 42 }}>
              <IconButton
                onClick={() => {
                  setOpenVoice(false);
                  console.log(openVoice);
                }}
              >
                <IoCloseOutline color={theme.palette.primary.main} size={34} />
              </IconButton>
            </Stack>
          )}
        </Stack>
      </form>
    </Box>
  );
};

export default ChatFooter;
