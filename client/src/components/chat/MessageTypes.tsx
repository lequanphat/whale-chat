import { Avatar, Box, IconButton, Menu, MenuItem, Stack, Typography, useTheme } from '@mui/material';
import { MdOutlineFileDownload } from 'react-icons/md';
import { PiDotsThreeVerticalBold } from 'react-icons/pi';
import React, { ReactElement, useState } from 'react';
import download from 'downloadjs';
import default_img from '../../assets/default-img.jpg';
import getFileImage from '../../utils/getFileImage';
import api from '../../api/internal';
import { Message } from './interface';

const Message_Option = [
  {
    title: 'Reply',
  },
  {
    title: 'React to message',
  },
  {
    title: 'Forward message',
  },
  {
    title: 'Report',
  },
  {
    title: 'Delete',
  },
];

export const MessagesOption = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <PiDotsThreeVerticalBold
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Stack spacing={1} px={1}>
          {Message_Option.map((item, index) => {
            return (
              <MenuItem key={index} onClick={handleClose} sx={{ fontSize: 14, fontWeight: 400 }}>
                {item.title}
              </MenuItem>
            );
          })}
        </Stack>
      </Menu>
    </>
  );
};
export const MessageWrapper = React.memo(
  ({ fromSelf, avatar, children }: { fromSelf: boolean; avatar: string; children: ReactElement }) => {
    return (
      <Stack direction="row" justifyContent={fromSelf === true ? 'end' : 'start'} width="100%">
        <Box width={'52px'}>{!fromSelf && avatar && <Avatar src={avatar} />}</Box>
        {children}
      </Stack>
    );
  },
);
const TextMessage = React.memo(({ msg, fromSelf }: { msg: Message; fromSelf: boolean }) => {
  const theme = useTheme();

  return (
    <MessageWrapper fromSelf={fromSelf} avatar={msg.avatar}>
      <Box
        sx={{
          backgroundColor: fromSelf ? theme.palette.primary.main : theme.palette.background.paper,
          borderRadius: 1.8,
          width: 'max-content',
          p: '10px 16px',
        }}
      >
        <Typography variant="body1" color={fromSelf ? '#fff' : theme.palette.text.primary}>
          {msg.text}
        </Typography>
      </Box>
    </MessageWrapper>
  );
});
const SystemMessage = React.memo(({ msg }: { msg: Message }) => {
  const theme = useTheme();

  return (
    <Stack direction="row" alignItems="center" justifyContent="center">
      <Typography
        variant="body1"
        fontSize="13px"
        sx={{
          color: theme.palette.text.primary,
          bgcolor: theme.palette.background.paper,
          borderRadius: '999px',
          p: '4px 16px',
          opacity: 0.8,
        }}
      >
        {msg.text}
      </Typography>
    </Stack>
  );
});

const DocMessage = React.memo(({ msg, fromSelf }: { msg: Message; fromSelf: boolean }) => {
  const theme = useTheme();
  const handleDownloadFile = async (filePath: string) => {
    let fileName: string | string[] = filePath.split('/');
    fileName = fileName[fileName.length - 1];
    const response = await api.get(`/message/download/${fileName}`, {
      responseType: 'blob',
    });
    download(response.data, fileName);
    console.log('doc message render...');
  };
  return (
    <MessageWrapper fromSelf={fromSelf} avatar={msg.avatar}>
      <Box
        p={1.2}
        sx={{
          backgroundColor: fromSelf ? theme.palette.primary.main : theme.palette.background.paper,
          borderRadius: 1.2,
          width: 'max-content',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={3} sx={{ backgroundColor: 'transparent' }}>
          <img src={getFileImage(msg.text)} alt="123" style={{ maxHeight: 50 }} />
          <Typography
            variant="body1"
            color={fromSelf ? '#fff' : theme.palette.text.primary}
            sx={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          >
            {msg.text}
          </Typography>
          <IconButton onClick={() => handleDownloadFile(msg.doc)}>
            <MdOutlineFileDownload color={fromSelf ? '#fff' : theme.palette.text.primary} />
          </IconButton>
        </Stack>
      </Box>
    </MessageWrapper>
  );
});

const MediaMessage = React.memo(({ msg, fromSelf }: { msg: Message; fromSelf: boolean }) => {
  const [imageLink, setImageLink] = useState(msg.image);
  return (
    <MessageWrapper fromSelf={fromSelf} avatar={msg.avatar}>
      <Box
        sx={{
          width: 300,
          maxHeight: 600,
          borderRadius: 1.2,
          overflow: 'hidden',
          boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
        }}
      >
        <img
          src={imageLink}
          alt={'image'}
          style={{ width: '100%', height: '100%' }}
          onError={() => {
            setImageLink(default_img);
          }}
        />
      </Box>
    </MessageWrapper>
  );
});
const VoiceMessage = React.memo(({ msg, fromSelf }: { msg: Message; fromSelf: boolean }) => {
  return (
    <MessageWrapper fromSelf={fromSelf} avatar={msg.avatar}>
      <audio controls src={msg.voice} />
    </MessageWrapper>
  );
});
const TimeLine = ({ text }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" alignItems="center" justifyContent="center">
      <Typography
        variant="body1"
        fontSize="12px"
        sx={{
          color: theme.palette.text.primary,
          bgcolor: theme.palette.background.paper,
          borderRadius: '999px',
          p: '4px 16px',
          opacity: 0.8,
        }}
      >
        {text}
      </Typography>
    </Stack>
  );
};

export { TimeLine, TextMessage, MediaMessage, DocMessage, VoiceMessage, SystemMessage };
