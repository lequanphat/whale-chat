import { Box, Fab, IconButton, InputAdornment, Stack, Tooltip } from '@mui/material';
import StyledInput from '../input/StyledInput';
import { HiOutlineLink } from 'react-icons/hi';
import { MdOutlineInsertEmoticon } from 'react-icons/md';
import StyledEmojiPicker from './StyledEmojiPicker';
import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import { IoImageOutline, IoReaderOutline, IoPersonOutline, IoMicOutline } from 'react-icons/io5';
import { EmojiClickData } from 'emoji-picker-react';
import MediaPreview from './MediaPreview';

const Actions = [
  {
    color: '#4da5fe',
    icon: <IoImageOutline size={22} />,
    title: 'Photo/Video',
  },
  {
    color: '#4da5fe',
    icon: <IoReaderOutline size={22} />,
    title: 'Document',
  },
  {
    color: '#4da5fe',
    icon: <IoMicOutline size={24} />,
    title: 'Voice',
  },

  {
    color: '#4da5fe',
    icon: <IoPersonOutline size={22} />,
    title: 'Contact',
  },
];

const ChatInput = ({ text, docFile, imageFile, setText, setDocFile, setImageFile, setOpenVoice }) => {
  const [openPicker, setOpenPicker] = useState<boolean>(false);
  const [openActions, setOpenActions] = useState<boolean>(false);
  const imageInputRef = useRef(null);
  const documentInputRef = useRef(null);

  const handleEmojiClick = useCallback((emojiData: EmojiClickData) => {
    setText((pre) => pre + emojiData.emoji);
  }, []);

  const handleChooseAction = useCallback((index: number) => {
    setOpenActions(false);
    if (!imageInputRef.current) {
      return;
    }
    switch (index) {
      case 0:
        imageInputRef.current.click();
        break;
      case 1:
        documentInputRef.current.click();
        break;
      case 2:
        setOpenVoice(true);
        break;
      case 3:
        alert('Contacts feature');
        break;

      default:
        break;
    }
  }, []);

  const handleChooseImageFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files[0]);
    setImageFile(e.target.files[0]);
    e.target.value = '';
  };
  const handleResetChooseImage = () => {
    setImageFile(null);
  };
  const handleResetChooseDoc = () => {
    setDocFile(null);
  };
  const handleChooseDocFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files[0]);
    setDocFile(e.target.files[0]);
    e.target.value = '';
  };
  return (
    <Box width="100%" position="relative" p={0}>
      {(imageFile || docFile) && (
        <MediaPreview
          imageFile={imageFile}
          docFile={docFile}
          handleReset={imageFile ? handleResetChooseImage : handleResetChooseDoc}
        />
      )}
      <Box display={openPicker ? 'block' : 'none'}>
        <StyledEmojiPicker handleEmojiClick={handleEmojiClick} />
      </Box>
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*,video/*"
        style={{ display: 'none' }} // Ẩn input element
        onChange={(e) => {
          handleChooseImageFile(e);
        }}
      />
      <input
        ref={documentInputRef}
        type="file"
        accept="application/pdf,text/*"
        style={{ display: 'none' }} // Ẩn input element
        onChange={(e) => {
          handleChooseDocFile(e);
        }}
      />
      <StyledInput
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        fullWidth
        placeholder="Write a message..."
        variant="filled"
        autoComplete="off"
        InputProps={{
          disableUnderline: true,

          startAdornment: (
            <Stack>
              {openActions && (
                <Stack position="relative">
                  {Actions.map((item, index) => {
                    return (
                      <Tooltip key={index} title={item.title} placement="right">
                        <Fab
                          color="primary"
                          aria-label="add"
                          sx={{
                            position: 'absolute',
                            top: -(102 + index * 70),
                            backgroundColor: item.color,
                          }}
                          onClick={() => {
                            handleChooseAction(index);
                          }}
                        >
                          {item.icon}
                        </Fab>
                      </Tooltip>
                    );
                  })}
                </Stack>
              )}
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setOpenActions(!openActions);
                  }}
                >
                  <HiOutlineLink />
                </IconButton>
              </InputAdornment>
            </Stack>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  setOpenPicker(!openPicker);
                }}
              >
                <MdOutlineInsertEmoticon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(ChatInput);
